import { defineRelations } from "drizzle-orm";
import * as schema from "./schema.js";

/**
 * RQBv2 relations for the Drizzle schema — `@pothos/plugin-drizzle` derives its
 * object types and `t.relation` fields from this config.
 *
 * `user` ↔ `address` is 1:1 both ways (#48): a user has at most one address, and
 * an address belongs to exactly one user (its `user_id` FK is unique).
 *
 * The catalogue (#47) wires three edges: an item owns many `sizes`, an item was
 * `createdBy` exactly one staff user (non-null — every item has an author), and
 * the inverse `user.createdItems`. Only the `one` sides carry `from`/`to`; the
 * `many` sides are inferred from them.
 *
 * Orders (#51) add the ordering graph: an order was `orderedBy` exactly one user
 * and owns many `orderedItems`; each `ordered_item` points at its parent `order`
 * and the `item` it orders. The inverse `many` sides (`user.orders`,
 * `item.orderedItems`) let the ownership queries and cascades resolve either way.
 */
export const relations = defineRelations(schema, (r) => ({
	user: {
		address: r.one.address({
			from: r.user.id,
			to: r.address.userId,
		}),
		createdItems: r.many.item(),
		orders: r.many.order(),
	},
	address: {
		user: r.one.user({
			from: r.address.userId,
			to: r.user.id,
		}),
	},
	item: {
		sizes: r.many.size(),
		createdBy: r.one.user({
			from: r.item.createdById,
			to: r.user.id,
			optional: false,
		}),
		orderedItems: r.many.orderedItem(),
	},
	size: {
		item: r.one.item({
			from: r.size.itemId,
			to: r.item.id,
			optional: false,
		}),
	},
	order: {
		orderedBy: r.one.user({
			from: r.order.orderedById,
			to: r.user.id,
			optional: false,
		}),
		orderedItems: r.many.orderedItem(),
	},
	orderedItem: {
		order: r.one.order({
			from: r.orderedItem.orderId,
			to: r.order.id,
			optional: false,
		}),
		item: r.one.item({
			from: r.orderedItem.itemId,
			to: r.item.id,
			optional: false,
		}),
	},
}));
