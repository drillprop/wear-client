import SchemaBuilder from "@pothos/core";
import DrizzlePlugin from "@pothos/plugin-drizzle";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import { getTableConfig } from "drizzle-orm/pg-core";
import { type ExecutionResult, execute, parse } from "graphql";
import { beforeEach, expect, test } from "vitest";
import type { Context } from "../context.js";
import type { DbClient } from "../db/client.js";
import { relations } from "../db/relations.js";
import { user } from "../db/schema.js";
import { testContext } from "../test-support/graphql.js";
import { createTestDb } from "../test-support/pglite.js";
import { type AuthScopes, resolveAuthScopes } from "./scopes.js";

/**
 * A minimal schema wired with the *same* scope initializer the real builder uses
 * (`resolveAuthScopes`), exercising the scope-auth plugin's field gating
 * end-to-end. The auth spine ships no gated operations of its own yet, so this
 * stands in for the later slices' gated ops and proves the mechanism they all
 * depend on actually rejects and admits the right callers (AC#3).
 */
const gateBuilder = new SchemaBuilder<{
	Context: Context;
	AuthScopes: AuthScopes;
	DrizzleRelations: typeof relations;
}>({
	plugins: [ScopeAuthPlugin, DrizzlePlugin],
	scopeAuth: { authScopes: (ctx) => resolveAuthScopes(ctx) },
	drizzle: { client: (ctx) => ctx.db, getTableConfig, relations },
});

gateBuilder.queryType({
	fields: (t) => ({
		memberArea: t.boolean({
			authScopes: { loggedIn: true },
			resolve: () => true,
		}),
		staffArea: t.boolean({
			authScopes: { staff: true },
			resolve: () => true,
		}),
		adminArea: t.boolean({
			authScopes: { admin: true },
			resolve: () => true,
		}),
	}),
});

const gateSchema = gateBuilder.toSchema();

let db: DbClient;

beforeEach(async () => {
	db = await createTestDb();
});

async function seed(role: "ADMIN" | "EMPLOYEE" | "CUSTOMER") {
	const [row] = await db
		.insert(user)
		.values({ email: `${role}@wear.test`, password: "hash", role })
		.returning();
	if (!row) {
		throw new Error("seed failed");
	}
	return row.id;
}

function fire(field: string, userId: string | null): Promise<ExecutionResult> {
	return Promise.resolve(
		execute({
			schema: gateSchema,
			document: parse(`{ ${field} }`),
			contextValue: testContext(db, { userId }),
		}),
	);
}

function expectAdmitted(result: ExecutionResult, field: string) {
	expect(result.errors).toBeUndefined();
	expect(result.data?.[field]).toBe(true);
}

function expectRejected(result: ExecutionResult, field: string) {
	expect(result.errors).toBeDefined();
	expect(result.errors?.[0]?.message).toMatch(/[Nn]ot authorized/);
	expect(result.data?.[field] ?? null).toBeNull();
}

test("an anonymous request is rejected from every gated field", async () => {
	expectRejected(await fire("memberArea", null), "memberArea");
	expectRejected(await fire("staffArea", null), "staffArea");
	expectRejected(await fire("adminArea", null), "adminArea");
});

test("a CUSTOMER reaches the member area but not staff or admin areas", async () => {
	const id = await seed("CUSTOMER");
	expectAdmitted(await fire("memberArea", id), "memberArea");
	expectRejected(await fire("staffArea", id), "staffArea");
	expectRejected(await fire("adminArea", id), "adminArea");
});

test("an EMPLOYEE reaches member and staff areas but not the admin area", async () => {
	const id = await seed("EMPLOYEE");
	expectAdmitted(await fire("memberArea", id), "memberArea");
	expectAdmitted(await fire("staffArea", id), "staffArea");
	expectRejected(await fire("adminArea", id), "adminArea");
});

test("an ADMIN reaches every gated field", async () => {
	const id = await seed("ADMIN");
	expectAdmitted(await fire("memberArea", id), "memberArea");
	expectAdmitted(await fire("staffArea", id), "staffArea");
	expectAdmitted(await fire("adminArea", id), "adminArea");
});
