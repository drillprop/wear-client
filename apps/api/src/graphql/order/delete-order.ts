import { eq } from "drizzle-orm";
import { GraphQLError } from "graphql";
import { order } from "../../db/schema.js";
import { builder } from "../builder.js";
import { requireUserId } from "../shared/require-user.js";
import { SuccessMessageRef } from "../shared/success-message.js";

/**
 * `deleteOrder` — a customer cancels their own still-pending order. Ownership is
 * checked first, and a not-owned order reports the same "not found" as a missing
 * one so a customer can't probe other people's order ids. Only a PENDING order
 * may be cancelled — once an admin has moved it on (PAID onward) it's locked. The
 * FK cascade takes the order's lines with it.
 */
builder.mutationField("deleteOrder", (t) =>
	t.field({
		type: SuccessMessageRef,
		nullable: false,
		authScopes: { loggedIn: true },
		args: {
			id: t.arg.id({ required: true }),
		},
		resolve: async (_root, { id }, ctx) => {
			const userId = requireUserId(ctx);

			const [found] = await ctx.db
				.select({ orderedById: order.orderedById, status: order.status })
				.from(order)
				.where(eq(order.id, id))
				.limit(1);
			if (!found || found.orderedById !== userId) {
				throw new GraphQLError("Order not found");
			}
			if (found.status !== "PENDING") {
				throw new GraphQLError("Only a pending order can be cancelled");
			}

			await ctx.db.delete(order).where(eq(order.id, id));
			return { message: "Order deleted" };
		},
	}),
);
