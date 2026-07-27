import { type ExecutionResult, execute, parse } from "graphql";
import type { Context } from "../context.js";
import type { DbClient } from "../db/client.js";
import { schema } from "../graphql/schema.js";

/**
 * Build an execution context for the seam. `db` is required; `userId`, the
 * session sinks, and the mailer default to an anonymous request with no-op
 * cookies and a no-op sender, and any of them can be overridden (e.g. inject a
 * `userId`, or pass a spy `issueSession`/`mailer` to assert it was invoked).
 */
export function testContext(
	db: DbClient,
	overrides: Partial<Context> = {},
): Context {
	return {
		db,
		userId: null,
		issueSession: () => {},
		clearSession: () => {},
		mailer: { sendPasswordResetEmail: async () => {} },
		...overrides,
	};
}

/**
 * Fire a GraphQL document through the assembled schema in-process — the single
 * test seam (#35). No HTTP, no cookie parsing: the context is injected directly.
 */
export function runOperation(
	document: string,
	contextValue: Context,
	variableValues?: Record<string, unknown>,
): Promise<ExecutionResult> {
	return Promise.resolve(
		execute({
			schema,
			document: parse(document),
			contextValue,
			variableValues,
		}),
	);
}
