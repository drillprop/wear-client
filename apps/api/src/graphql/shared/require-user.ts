import { GraphQLError } from "graphql";
import type { Context } from "../../context.js";

/**
 * Narrow `ctx.userId` to a non-null id for resolvers already gated by the
 * `loggedIn` scope. scope-auth guarantees a session before the resolver runs, so
 * the throw is unreachable defense-in-depth — its real job is to turn the
 * `string | null` context field into the `string` the ownership-scoped queries
 * need without an assertion.
 */
export function requireUserId(ctx: Context): string {
	if (!ctx.userId) {
		throw new GraphQLError("Not authenticated");
	}
	return ctx.userId;
}
