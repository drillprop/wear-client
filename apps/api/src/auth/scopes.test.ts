import { beforeEach, expect, test } from "vitest";
import type { DbClient } from "../db/client.js";
import { user } from "../db/schema.js";
import { testContext } from "../test-support/graphql.js";
import { createTestDb } from "../test-support/pglite.js";
import { resolveAuthScopes } from "./scopes.js";

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

test("an anonymous request has no scopes", async () => {
	const scopes = await resolveAuthScopes(testContext(db, { userId: null }));
	expect(scopes).toEqual({ loggedIn: false, staff: false, admin: false });
});

test("a userId with no matching row is treated as anonymous", async () => {
	const scopes = await resolveAuthScopes(
		testContext(db, { userId: "00000000-0000-0000-0000-000000000000" }),
	);
	expect(scopes).toEqual({ loggedIn: false, staff: false, admin: false });
});

test("a CUSTOMER is logged in but neither staff nor admin", async () => {
	const scopes = await resolveAuthScopes(
		testContext(db, { userId: await seed("CUSTOMER") }),
	);
	expect(scopes).toEqual({ loggedIn: true, staff: false, admin: false });
});

test("an EMPLOYEE counts as staff but not admin", async () => {
	const scopes = await resolveAuthScopes(
		testContext(db, { userId: await seed("EMPLOYEE") }),
	);
	expect(scopes).toEqual({ loggedIn: true, staff: true, admin: false });
});

test("an ADMIN counts as both staff and admin", async () => {
	const scopes = await resolveAuthScopes(
		testContext(db, { userId: await seed("ADMIN") }),
	);
	expect(scopes).toEqual({ loggedIn: true, staff: true, admin: true });
});
