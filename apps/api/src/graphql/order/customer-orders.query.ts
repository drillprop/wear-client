import { eq } from "drizzle-orm";
import { order } from "../../db/schema.js";
import { builder } from "../builder.js";
import { requireUserId } from "../shared/require-user.js";
import { OrderRef } from "./order.type.js";

/**
 * The context user's own orders and their total, in the legacy
 * `UserOrdersAndCount` envelope. The parent value is the caller's id plus the
 * page window; `select` and `count` each rebuild their query from it, so a
 * caller pays only for the fields it asks for. Both are scoped to
 * `orderedById = userId`, which is what keeps one customer from ever seeing
 * another's orders through this path.
 */
interface UserOrdersSpec {
	userId: string;
	take: number | null;
	skip: number | null;
}

const UserOrdersAndCount =
	builder.objectRef<UserOrdersSpec>("UserOrdersAndCount");

UserOrdersAndCount.implement({
	fields: (t) => ({
		select: t.drizzleField({
			type: [OrderRef],
			resolve: (query, spec, _args, ctx) =>
				ctx.db.query.order.findMany(
					query({
						where: { orderedById: spec.userId },
						orderBy: { createdAt: "desc" },
						limit: spec.take ?? undefined,
						offset: spec.skip ?? undefined,
					}),
				),
		}),
		count: t.int({
			nullable: false,
			resolve: (spec, _args, ctx) =>
				ctx.db.$count(order, eq(order.orderedById, spec.userId)),
		}),
	}),
});

/**
 * `userOrders` — the caller's own order history, newest first, paginated. Only
 * normalizes the window; the queries run lazily in the envelope fields above.
 */
builder.queryField("userOrders", (t) =>
	t.field({
		type: UserOrdersAndCount,
		nullable: false,
		authScopes: { loggedIn: true },
		args: {
			take: t.arg.int({ required: false }),
			skip: t.arg.int({ required: false }),
		},
		resolve: (_root, { take, skip }, ctx): UserOrdersSpec => ({
			userId: requireUserId(ctx),
			take: take ?? null,
			skip: skip ?? null,
		}),
	}),
);

/**
 * `order` — a single one of the caller's own orders by id, with its lines, or
 * `null` when none matches. The `orderedById` clause makes another customer's id
 * resolve to `null` rather than leaking that the order exists.
 */
builder.queryField("order", (t) =>
	t.drizzleField({
		type: OrderRef,
		nullable: true,
		authScopes: { loggedIn: true },
		args: {
			id: t.arg.id({ required: true }),
		},
		resolve: (query, _root, { id }, ctx) => {
			const userId = requireUserId(ctx);
			return ctx.db.query.order.findFirst(
				query({ where: { id, orderedById: userId } }),
			);
		},
	}),
);
