import { defineRelations } from "drizzle-orm";
import * as schema from "./schema.js";

/**
 * RQBv2 relations for the Drizzle schema — `@pothos/plugin-drizzle` derives its
 * object types and `t.relation` fields from this config.
 *
 * The catalogue (#47) wires three edges: an item owns many `sizes`, an item was
 * `createdBy` exactly one staff user (non-null — every item has an author), and
 * the inverse `user.createdItems`. Only the `one` sides carry `from`/`to`; the
 * `many` sides are inferred from them.
 */
export const relations = defineRelations(schema, (r) => ({
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
	user: {
		createdItems: r.many.item(),
	},
}));
