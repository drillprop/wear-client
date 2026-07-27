import { eq } from "drizzle-orm";
import { GraphQLError } from "graphql";
import { order } from "../../db/schema.js";
import { builder } from "../builder.js";
import { SuccessMessageRef } from "../shared/success-message.js";
import { OrderStatusEnum } from "./enums.js";

/**
 * `manageOrder` — an admin advances any order to a new status (PENDING → PAID →
 * SENT → COMPLETED, or a correction back). Gated to `admin`; a missing id is a
 * hard error rather than a silent no-op so the caller knows the change didn't
 * land. The transition is a plain status write — the slice models the four
 * states, not the rules between them.
 */
builder.mutationField("manageOrder", (t) =>
	t.field({
		type: SuccessMessageRef,
		nullable: false,
		authScopes: { admin: true },
		args: {
			id: t.arg.id({ required: true }),
			status: t.arg({ type: OrderStatusEnum, required: true }),
		},
		resolve: async (_root, { id, status }, ctx) => {
			const updated = await ctx.db
				.update(order)
				.set({ status })
				.where(eq(order.id, id))
				.returning({ id: order.id });
			if (updated.length === 0) {
				throw new GraphQLError("Order not found");
			}
			return { message: "Order status updated" };
		},
	}),
);
