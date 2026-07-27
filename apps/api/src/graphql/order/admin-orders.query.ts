import type { DbClient } from "../../db/client.js";
import { builder } from "../builder.js";
import { SearchOrdersInput } from "./inputs.js";
import { OrderRef } from "./order.type.js";

type OrderFindManyConfig = NonNullable<
	Parameters<DbClient["query"]["order"]["findMany"]>[0]
>;
type OrderRqbWhere = NonNullable<OrderFindManyConfig["where"]>;

/**
 * The columns an order search may sort by, keyed by the legacy entity-qualified
 * names the web app sends and valued by the Drizzle column. Whitelisting keeps
 * `sortBy` from naming an arbitrary column — an unknown key falls back to
 * `createdAt` (newest-first, the order book's default).
 */
const SORT_COLUMNS = {
	"Order.createdAt": "createdAt",
	"Order.updatedAt": "updatedAt",
} as const;

/**
 * `orders` — the admin order-book search. Filters by `status`/`id` (both bound
 * parameters), pages with `take`/`skip`, and sorts newest-first by default. The
 * plugin's `query` folds the requested `orderedBy`/`orderedItems` selection in,
 * so a page of orders and their relations loads in one round-trip. Gated to
 * `admin` — the only path that returns orders the caller doesn't own.
 */
builder.queryField("orders", (t) =>
	t.drizzleField({
		type: [OrderRef],
		authScopes: { admin: true },
		args: {
			where: t.arg({ type: SearchOrdersInput, required: false }),
		},
		resolve: (query, _root, { where }, ctx) => {
			const rqbWhere: OrderRqbWhere = {};
			if (where?.id) {
				rqbWhere.id = where.id;
			}
			if (where?.status) {
				rqbWhere.status = where.status;
			}

			const column =
				SORT_COLUMNS[where?.sortBy as keyof typeof SORT_COLUMNS] ?? "createdAt";
			const direction: "asc" | "desc" =
				where?.sortOrder === "ASC" ? "asc" : "desc";
			const orderBy =
				column === "updatedAt"
					? { updatedAt: direction }
					: { createdAt: direction };

			return ctx.db.query.order.findMany(
				query({
					where: rqbWhere,
					orderBy,
					limit: where?.take ?? undefined,
					offset: where?.skip ?? undefined,
				}),
			);
		},
	}),
);
