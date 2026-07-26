import SchemaBuilder from "@pothos/core";
import DrizzlePlugin from "@pothos/plugin-drizzle";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import ZodPlugin from "@pothos/plugin-zod";
import { getTableConfig } from "drizzle-orm/pg-core";
import type { AuthScopes } from "../auth/scopes.js";
import { resolveAuthScopes } from "../auth/scopes.js";
import type { Context } from "../context.js";
import { relations } from "../db/relations.js";

/**
 * The Pothos schema builder, wired to scope-auth, drizzle, and zod. It is a
 * module-level singleton so type registration accumulates across the graphql
 * modules imported by `schema.ts`.
 *
 * `drizzle.client` and the scope initializer both resolve per-request from the
 * context, so the builder never binds to a concrete database — production passes
 * the node-postgres client, tests pass pglite, through the same seam.
 *
 * `scope-auth` is listed first so its authorization wrapper runs before the
 * other plugins' resolver wrappers, as the plugin recommends.
 */
export const builder = new SchemaBuilder<{
	Context: Context;
	AuthScopes: AuthScopes;
	DrizzleRelations: typeof relations;
	Scalars: {
		DateTime: { Input: Date; Output: Date };
	};
}>({
	plugins: [ScopeAuthPlugin, DrizzlePlugin, ZodPlugin],
	scopeAuth: {
		authScopes: (ctx) => resolveAuthScopes(ctx),
	},
	drizzle: {
		client: (ctx) => ctx.db,
		getTableConfig,
		relations,
	},
});
