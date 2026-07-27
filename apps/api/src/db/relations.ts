import { defineRelations } from "drizzle-orm";
import * as schema from "./schema.js";

/**
 * RQBv2 relations for the Drizzle schema. `@pothos/plugin-drizzle` derives its
 * object types and `t.relation` fields from this config.
 *
 * `user` ↔ `address` is 1:1 both ways: a user has at most one address, and an
 * address belongs to exactly one user (its `user_id` FK is unique).
 */
export const relations = defineRelations(schema, (r) => ({
	user: {
		address: r.one.address({
			from: r.user.id,
			to: r.address.userId,
		}),
	},
	address: {
		user: r.one.user({
			from: r.address.userId,
			to: r.user.id,
		}),
	},
}));
