import { eq } from "drizzle-orm";
import { beforeEach, expect, test, vi } from "vitest";
import { hashPassword } from "../../auth/password.js";
import type { DbClient } from "../../db/client.js";
import { user } from "../../db/schema.js";
import { runOperation, testContext } from "../../test-support/graphql.js";
import { createTestDb } from "../../test-support/pglite.js";

const UPDATE_PERSONAL_INFO = `mutation UpdatePersonalInfo($input: PersonalInfoInput!) {
	updatePersonalInfo(input: $input) { message }
}`;
const SUBSCRIBE = `mutation Subscribe($newsletter: Boolean!) {
	subscribeToNewsletter(newsletter: $newsletter) { message }
}`;
const DELETE_ACCOUNT = `mutation DeleteAccount($password: String!) {
	deleteAccount(password: $password) { message }
}`;

let db: DbClient;

beforeEach(async () => {
	db = await createTestDb();
});

/** Seed a user with a real bcrypt hash, keyed by email so tests can find them. */
async function seedUser(
	email: string,
	password: string,
	role: "ADMIN" | "EMPLOYEE" | "CUSTOMER" = "CUSTOMER",
) {
	const [row] = await db
		.insert(user)
		.values({ email, password: await hashPassword(password), role })
		.returning();
	if (!row) {
		throw new Error("seed failed");
	}
	return row;
}

test("updatePersonalInfo updates the context user's profile fields", async () => {
	const me = await seedUser("me@wear.test", "hunter2");

	const result = await runOperation(
		UPDATE_PERSONAL_INFO,
		testContext(db, { userId: me.id }),
		{ input: { firstName: "Ada", lastName: "Lovelace", phoneNumber: "555" } },
	);

	expect(result.errors).toBeUndefined();
	expect(result.data?.updatePersonalInfo).toMatchObject({
		message: expect.any(String),
	});

	const [saved] = await db.select().from(user).where(eq(user.id, me.id));
	expect(saved).toMatchObject({
		firstName: "Ada",
		lastName: "Lovelace",
		phoneNumber: "555",
	});
});

test("updatePersonalInfo touches only the context user, never another", async () => {
	const me = await seedUser("me@wear.test", "hunter2");
	const other = await seedUser("other@wear.test", "hunter2");

	const result = await runOperation(
		UPDATE_PERSONAL_INFO,
		testContext(db, { userId: me.id }),
		{ input: { firstName: "Changed" } },
	);

	expect(result.errors).toBeUndefined();
	const [otherRow] = await db.select().from(user).where(eq(user.id, other.id));
	expect(otherRow?.firstName).toBeNull();
});

test("updatePersonalInfo rejects an anonymous request", async () => {
	const result = await runOperation(UPDATE_PERSONAL_INFO, testContext(db), {
		input: { firstName: "Ada" },
	});

	expect(result.data?.updatePersonalInfo ?? null).toBeNull();
	expect(result.errors?.[0]?.message).toMatch(/[Nn]ot authorized/);
});

test("subscribeToNewsletter flips the flag for the context user only", async () => {
	const me = await seedUser("me@wear.test", "hunter2");
	const other = await seedUser("other@wear.test", "hunter2");

	const result = await runOperation(
		SUBSCRIBE,
		testContext(db, { userId: me.id }),
		{ newsletter: true },
	);

	expect(result.errors).toBeUndefined();
	const [meRow] = await db.select().from(user).where(eq(user.id, me.id));
	const [otherRow] = await db.select().from(user).where(eq(user.id, other.id));
	expect(meRow?.newsletter).toBe(true);
	expect(otherRow?.newsletter).toBe(false);
});

test("subscribeToNewsletter can also unsubscribe", async () => {
	const me = await seedUser("me@wear.test", "hunter2");
	await db.update(user).set({ newsletter: true }).where(eq(user.id, me.id));

	const result = await runOperation(
		SUBSCRIBE,
		testContext(db, { userId: me.id }),
		{ newsletter: false },
	);

	expect(result.errors).toBeUndefined();
	const [meRow] = await db.select().from(user).where(eq(user.id, me.id));
	expect(meRow?.newsletter).toBe(false);
});

test("subscribeToNewsletter rejects an anonymous request", async () => {
	const result = await runOperation(SUBSCRIBE, testContext(db), {
		newsletter: true,
	});

	expect(result.errors?.[0]?.message).toMatch(/[Nn]ot authorized/);
});

test("deleteAccount removes the user and clears the session on the right password", async () => {
	const me = await seedUser("me@wear.test", "hunter2");
	const clearSession = vi.fn();

	const result = await runOperation(
		DELETE_ACCOUNT,
		testContext(db, { userId: me.id, clearSession }),
		{ password: "hunter2" },
	);

	expect(result.errors).toBeUndefined();
	expect(clearSession).toHaveBeenCalledOnce();
	const count = await db.$count(user, eq(user.id, me.id));
	expect(count).toBe(0);
});

test("deleteAccount rejects a wrong password and keeps the account", async () => {
	const me = await seedUser("me@wear.test", "hunter2");
	const clearSession = vi.fn();

	const result = await runOperation(
		DELETE_ACCOUNT,
		testContext(db, { userId: me.id, clearSession }),
		{ password: "wrongpass" },
	);

	expect(result.data?.deleteAccount ?? null).toBeNull();
	expect(result.errors?.[0]?.message).toMatch(/password/i);
	expect(clearSession).not.toHaveBeenCalled();
	const count = await db.$count(user, eq(user.id, me.id));
	expect(count).toBe(1);
});

test("deleteAccount rejects an anonymous request", async () => {
	const result = await runOperation(DELETE_ACCOUNT, testContext(db), {
		password: "hunter2",
	});

	expect(result.errors?.[0]?.message).toMatch(/[Nn]ot authorized/);
});
