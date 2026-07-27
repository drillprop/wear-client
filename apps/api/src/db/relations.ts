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
 */
export const relations = defineRelations(schema, (r) => ({
	user: {
		address: r.one.address({
			from: r.user.id,
			to: r.address.userId,
		}),
		createdItems: r.many.item(),
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
	},
	size: {
		item: r.one.item({
			from: r.size.itemId,
			to: r.item.id,
			optional: false,
		}),
	},
}));
