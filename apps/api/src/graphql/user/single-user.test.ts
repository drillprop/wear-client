import { beforeEach, expect, test } from "vitest";
import type { DbClient } from "../../db/client.js";
import { address, user } from "../../db/schema.js";
import { runOperation, testContext } from "../../test-support/graphql.js";
import { createTestDb } from "../../test-support/pglite.js";

const SINGLE_USER = `query SingleUser($id: ID!) {
	user(id: $id) {
		id
		email
		role
		firstName
		lastName
		address { city country }
	}
}`;

let db: DbClient;

beforeEach(async () => {
	db = await createTestDb();
});

type Role = "ADMIN" | "EMPLOYEE" | "CUSTOMER";

async function seed(email: string, role: Role = "CUSTOMER") {
	const [row] = await db
		.insert(user)
		.values({ email, password: "hash", role })
		.returning();
	if (!row) {
		throw new Error("seed failed");
	}
	return row;
}

test("user fetches a single user by id for a staff (employee) caller", async () => {
	const employee = await seed("emp@wear.test", "EMPLOYEE");
	const target = await seed("target@wear.test", "CUSTOMER");
	await db
		.insert(address)
		.values({ userId: target.id, city: "London", country: "UK" });

	const result = await runOperation(
		SINGLE_USER,
		testContext(db, { userId: employee.id }),
		{ id: target.id },
	);

	expect(result.errors).toBeUndefined();
	const fetched = result.data?.user as {
		id: string;
		email: string;
		address: { city: string; country: string } | null;
	};
	expect(fetched.id).toBe(target.id);
	expect(fetched.email).toBe("target@wear.test");
	expect(fetched.address).toMatchObject({ city: "London", country: "UK" });
});

test("user returns null for an unknown id", async () => {
	const employee = await seed("emp@wear.test", "EMPLOYEE");

	const result = await runOperation(
		SINGLE_USER,
		testContext(db, { userId: employee.id }),
		{ id: "00000000-0000-0000-0000-000000000000" },
	);

	expect(result.errors).toBeUndefined();
	expect(result.data?.user ?? null).toBeNull();
});

test("user is rejected for a non-staff caller", async () => {
	const customer = await seed("customer@wear.test", "CUSTOMER");
	const target = await seed("target@wear.test", "CUSTOMER");

	const result = await runOperation(
		SINGLE_USER,
		testContext(db, { userId: customer.id }),
		{ id: target.id },
	);

	expect(result.errors?.[0]?.message).toMatch(/[Nn]ot authorized/);
});

test("user is rejected for an anonymous caller", async () => {
	const target = await seed("target@wear.test", "CUSTOMER");

	const result = await runOperation(SINGLE_USER, testContext(db), {
		id: target.id,
	});

	expect(result.errors?.[0]?.message).toMatch(/[Nn]ot authorized/);
});
