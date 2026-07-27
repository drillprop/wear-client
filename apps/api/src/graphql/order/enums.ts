import { builder } from "../builder.js";

/**
 * `OrderStatus` — an order's fulfilment lifecycle, mirroring the `order_status`
 * pgEnum in the Drizzle schema so the GraphQL values map straight onto the
 * stored column values (#51). PENDING is where a placed order starts; an admin
 * advances it through PAID → SENT → COMPLETED via `manageOrder`.
 */
export const OrderStatusEnum = builder.enumType("OrderStatus", {
	values: ["PENDING", "PAID", "SENT", "COMPLETED"] as const,
});
