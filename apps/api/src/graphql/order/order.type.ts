import { builder } from "../builder.js";
import { OrderStatusEnum } from "./enums.js";

/**
 * The `Order` GraphQL type, derived from the `order` Drizzle table (#51).
 * `status` is a custom field (the plugin can't `expose` an enum); `orderedBy`
 * (the customer) and `orderedItems` (the lines) load through the plugin's
 * relation seam, so a query for an order and its contents resolves in a single
 * round-trip. Ownership is enforced at the query resolvers, not the type — every
 * path that returns an `Order` has already scoped it to the caller (own orders)
 * or to an admin.
 */
export const OrderRef = builder.drizzleObject("order", {
	name: "Order",
	fields: (t) => ({
		id: t.exposeID("id", { nullable: false }),
		status: t.field({
			type: OrderStatusEnum,
			nullable: false,
			resolve: (o) => o.status,
		}),
		orderedBy: t.relation("orderedBy"),
		orderedItems: t.relation("orderedItems"),
		createdAt: t.field({
			type: "DateTime",
			nullable: false,
			resolve: (o) => o.createdAt,
		}),
		updatedAt: t.field({
			type: "DateTime",
			nullable: false,
			resolve: (o) => o.updatedAt,
		}),
	}),
});
