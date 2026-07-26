import SchemaBuilder from "@pothos/core";
import DrizzlePlugin from "@pothos/plugin-drizzle";
import { getTableConfig } from "drizzle-orm/pg-core";
import type { Context } from "../context.js";
import { relations } from "../db/relations.js";

/**
 * The Pothos schema builder, wired to `@pothos/plugin-drizzle`. It is a
 * module-level singleton so type registration (`builder.drizzleObject`,
 * `builder.queryType`) accumulates across the graphql modules.
 *
 * `drizzle.client` is resolved per-request from the context, so the builder
 * never binds to a concrete database at construction — production passes the
 * node-postgres client, tests pass the pglite one, through the same seam.
 */
export const builder = new SchemaBuilder<{
	Context: Context;
	DrizzleRelations: typeof relations;
}>({
	plugins: [DrizzlePlugin],
	drizzle: {
		client: (ctx) => ctx.db,
		getTableConfig,
		relations,
	},
});
