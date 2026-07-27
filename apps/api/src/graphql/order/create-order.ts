import { inArray } from "drizzle-orm";
import { GraphQLError } from "graphql";
import { item, order, orderedItem } from "../../db/schema.js";
import { builder } from "../builder.js";
import { requireUserId } from "../shared/require-user.js";
import { CreateOrderInput } from "./inputs.js";
import { OrderRef } from "./order.type.js";

/**
 * `createOrder` — a logged-in customer places an order from a list of item/size
 * lines. The new order is theirs (`orderedBy` is the context user) and starts
 * PENDING. Every referenced item is checked to exist up front — the FK would
 * reject an unknown id, but with a raw database error; the explicit check turns
 * that into a clean message and avoids opening a doomed transaction. The order
 * row and its lines are written in one transaction, so a half-written order can
 * never survive a failure.
 */
builder.mutationField("createOrder", (t) =>
	t.field({
		type: OrderRef,
		nullable: false,
		authScopes: { loggedIn: true },
		args: {
			input: t.arg({ type: [CreateOrderInput], required: true }),
		},
		resolve: async (_root, { input }, ctx) => {
			const userId = requireUserId(ctx);

			if (input.length === 0) {
				throw new GraphQLError("An order needs at least one item");
			}

			const itemIds = [...new Set(input.map((line) => line.itemId))];
			const found = await ctx.db
				.select({ id: item.id })
				.from(item)
				.where(inArray(item.id, itemIds));
			if (found.length !== itemIds.length) {
				throw new GraphQLError("One or more items do not exist");
			}

			return ctx.db.transaction(async (tx) => {
				const [created] = await tx
					.insert(order)
					.values({ orderedById: userId })
					.returning();
				if (!created) {
					throw new GraphQLError("Failed to create order");
				}
				await tx.insert(orderedItem).values(
					input.map((line) => ({
						orderId: created.id,
						itemId: line.itemId,
						sizeSymbol: line.size,
					})),
				);
				return created;
			});
		},
	}),
);
