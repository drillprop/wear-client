import { eq } from "drizzle-orm";
import { beforeEach, expect, test } from "vitest";
import type { DbClient } from "../../db/client.js";
import { address, user } from "../../db/schema.js";
import { runOperation, testContext } from "../../test-support/graphql.js";
import { createTestDb } from "../../test-support/pglite.js";

const CHANGE_ROLE = `mutation ChangeRole($email: String!, $role: UserRole!) {
	changeUserRole(email: $email, role: $role) { message }
}`;
const USERS = `query Users($where: SearchUserInput) {
	users(where: $where) {
		count
		select { id email role firstName lastName }
	}
}`;

let db: DbClient;

beforeEach(async () => {
	db = await createTestDb();
});

type Role = "ADMIN" | "EMPLOYEE" | "CUSTOMER";

async function seed(
	email: string,
	role: Role = "CUSTOMER",
	extra: { firstName?: string; lastName?: string } = {},
) {
	const [row] = await db
		.insert(user)
		.values({ email, password: "hash", role, ...extra })
		.returning();
	if (!row) {
		throw new Error("seed failed");
	}
	return row;
}

async function admin() {
	const row = await seed("admin@wear.test", "ADMIN");
	return testContext(db, { userId: row.id });
}

test("changeUserRole promotes a user by email for an admin", async () => {
	const target = await seed("target@wear.test", "CUSTOMER");

	const result = await runOperation(CHANGE_ROLE, await admin(), {
		email: "target@wear.test",
		role: "EMPLOYEE",
	});

	expect(result.errors).toBeUndefined();
	const [after] = await db.select().from(user).where(eq(user.id, target.id));
	expect(after?.role).toBe("EMPLOYEE");
});

test("changeUserRole errors when no user has that email", async () => {
	const result = await runOperation(CHANGE_ROLE, await admin(), {
		email: "ghost@wear.test",
		role: "EMPLOYEE",
	});

	expect(result.data?.changeUserRole ?? null).toBeNull();
	expect(result.errors?.[0]?.message).toMatch(/not found/i);
});

test("changeUserRole is rejected for a non-admin caller", async () => {
	await seed("target@wear.test", "CUSTOMER");
	const customer = await seed("customer@wear.test", "CUSTOMER");

	const result = await runOperation(
		CHANGE_ROLE,
		testContext(db, { userId: customer.id }),
		{ email: "target@wear.test", role: "ADMIN" },
	);

	expect(result.errors?.[0]?.message).toMatch(/[Nn]ot authorized/);
	// The target's role was left untouched.
	const [target] = await db
		.select()
		.from(user)
		.where(eq(user.email, "target@wear.test"));
	expect(target?.role).toBe("CUSTOMER");
});

test("users returns every user with a total count for an admin", async () => {
	await seed("a@wear.test");
	await seed("b@wear.test");

	const result = await runOperation(USERS, await admin());

	expect(result.errors).toBeUndefined();
	const payload = result.data?.users as {
		count: number;
		select: { email: string }[];
	};
	// admin + a + b
	expect(payload.count).toBe(3);
	expect(payload.select).toHaveLength(3);
});

test("users filters by role", async () => {
	await seed("emp@wear.test", "EMPLOYEE");
	await seed("cust@wear.test", "CUSTOMER");

	const result = await runOperation(USERS, await admin(), {
		where: { role: "EMPLOYEE" },
	});

	const payload = result.data?.users as {
		count: number;
		select: { email: string }[];
	};
	expect(payload.count).toBe(1);
	expect(payload.select[0]?.email).toBe("emp@wear.test");
});

test("users filters by a partial, case-insensitive email match", async () => {
	await seed("alice@wear.test");
	await seed("bob@shop.test");

	const result = await runOperation(USERS, await admin(), {
		where: { email: "WEAR" },
	});

	const payload = result.data?.users as { select: { email: string }[] };
	const emails = payload.select.map((u) => u.email).sort();
	// admin@wear.test and alice@wear.test both match "wear", bob@shop.test doesn't.
	expect(emails).toEqual(["admin@wear.test", "alice@wear.test"]);
});

test("users filters by a partial first/last name match", async () => {
	await seed("ada@wear.test", "CUSTOMER", {
		firstName: "Ada",
		lastName: "Lovelace",
	});
	await seed("grace@wear.test", "CUSTOMER", {
		firstName: "Grace",
		lastName: "Hopper",
	});

	const ctx = await admin();

	const byFirst = await runOperation(USERS, ctx, {
		where: { firstName: "ad" },
	});
	const firstMatch = byFirst.data?.users as { count: number };
	expect(firstMatch.count).toBe(1);

	const byLast = await runOperation(USERS, ctx, {
		where: { lastName: "hopper" },
	});
	const lastMatch = byLast.data?.users as { count: number };
	expect(lastMatch.count).toBe(1);
});

test("users paginates with take/skip while count reflects the full match", async () => {
	for (const n of ["c1", "c2", "c3", "c4"]) {
		await seed(`${n}@wear.test`, "CUSTOMER");
	}

	const result = await runOperation(USERS, await admin(), {
		where: { role: "CUSTOMER", take: 2, skip: 1 },
	});

	const payload = result.data?.users as {
		count: number;
		select: unknown[];
	};
	// Four customers match; the page returns 2, but count is the full total.
	expect(payload.count).toBe(4);
	expect(payload.select).toHaveLength(2);
});

test("users resolves each user's address relation within the list", async () => {
	const customer = await seed("cust@wear.test", "CUSTOMER");
	await db
		.insert(address)
		.values({ userId: customer.id, city: "London", country: "UK" });

	const result = await runOperation(
		`query { users(where: { role: CUSTOMER }) {
			select { email address { city country } }
		} }`,
		await admin(),
	);

	expect(result.errors).toBeUndefined();
	const payload = result.data?.users as {
		select: { email: string; address: { city: string } | null }[];
	};
	const found = payload.select.find((u) => u.email === "cust@wear.test");
	expect(found?.address).toMatchObject({ city: "London", country: "UK" });
});

test("users is rejected for a non-admin caller", async () => {
	const customer = await seed("customer@wear.test", "CUSTOMER");

	const result = await runOperation(
		USERS,
		testContext(db, { userId: customer.id }),
	);

	expect(result.errors?.[0]?.message).toMatch(/[Nn]ot authorized/);
});

test("users is rejected for an anonymous caller", async () => {
	const result = await runOperation(USERS, testContext(db));

	expect(result.errors?.[0]?.message).toMatch(/[Nn]ot authorized/);
});
