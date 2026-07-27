import { eq } from "drizzle-orm";
import { beforeEach, expect, test } from "vitest";
import { hashPassword } from "../../auth/password.js";
import type { DbClient } from "../../db/client.js";
import { address, user } from "../../db/schema.js";
import { runOperation, testContext } from "../../test-support/graphql.js";
import { createTestDb } from "../../test-support/pglite.js";

const UPDATE_ADDRESS = `mutation UpdateAddress($input: UpdateAddressInput!) {
	updateAddress(input: $input) { message }
}`;
const ME_ADDRESS = `query { me { address { addressLine1 city country } } }`;

let db: DbClient;

beforeEach(async () => {
	db = await createTestDb();
});

async function seedUser(email: string) {
	const [row] = await db
		.insert(user)
		.values({ email, password: await hashPassword("hunter2") })
		.returning();
	if (!row) {
		throw new Error("seed failed");
	}
	return row;
}

test("updateAddress creates the address when the user has none", async () => {
	const me = await seedUser("me@wear.test");

	const result = await runOperation(
		UPDATE_ADDRESS,
		testContext(db, { userId: me.id }),
		{ input: { addressLine1: "1 Main St", city: "London", country: "UK" } },
	);

	expect(result.errors).toBeUndefined();
	const [row] = await db
		.select()
		.from(address)
		.where(eq(address.userId, me.id));
	expect(row).toMatchObject({
		addressLine1: "1 Main St",
		city: "London",
		country: "UK",
	});
});

test("updateAddress overwrites the existing address in place (no duplicate row)", async () => {
	const me = await seedUser("me@wear.test");
	await db
		.insert(address)
		.values({ userId: me.id, city: "Paris", country: "FR" });

	const result = await runOperation(
		UPDATE_ADDRESS,
		testContext(db, { userId: me.id }),
		{ input: { city: "Berlin", country: "DE" } },
	);

	expect(result.errors).toBeUndefined();
	const rows = await db.select().from(address).where(eq(address.userId, me.id));
	expect(rows).toHaveLength(1);
	expect(rows[0]).toMatchObject({ city: "Berlin", country: "DE" });
});

test("updateAddress writes only to the context user's address", async () => {
	const me = await seedUser("me@wear.test");
	const other = await seedUser("other@wear.test");
	await db
		.insert(address)
		.values({ userId: other.id, city: "Rome", country: "IT" });

	await runOperation(UPDATE_ADDRESS, testContext(db, { userId: me.id }), {
		input: { city: "Oslo", country: "NO" },
	});

	const [otherAddr] = await db
		.select()
		.from(address)
		.where(eq(address.userId, other.id));
	expect(otherAddr).toMatchObject({ city: "Rome", country: "IT" });
});

test("updateAddress rejects an anonymous request", async () => {
	const result = await runOperation(UPDATE_ADDRESS, testContext(db), {
		input: { city: "London" },
	});

	expect(result.errors?.[0]?.message).toMatch(/[Nn]ot authorized/);
});

test("User.address resolves the saved address through the relation", async () => {
	const me = await seedUser("me@wear.test");
	await db.insert(address).values({
		userId: me.id,
		addressLine1: "1 Main St",
		city: "London",
		country: "UK",
	});

	const result = await runOperation(
		ME_ADDRESS,
		testContext(db, { userId: me.id }),
	);

	expect(result.errors).toBeUndefined();
	expect(result.data?.me).toMatchObject({
		address: { addressLine1: "1 Main St", city: "London", country: "UK" },
	});
});

test("User.address is null when no address has been saved", async () => {
	const me = await seedUser("me@wear.test");

	const result = await runOperation(
		ME_ADDRESS,
		testContext(db, { userId: me.id }),
	);

	expect(result.errors).toBeUndefined();
	const viewer = result.data?.me as { address: unknown };
	expect(viewer.address).toBeNull();
});
