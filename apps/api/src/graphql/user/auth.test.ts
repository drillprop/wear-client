import { eq } from "drizzle-orm";
import { beforeEach, expect, test, vi } from "vitest";
import { hashPassword, verifyPassword } from "../../auth/password.js";
import type { DbClient } from "../../db/client.js";
import { user } from "../../db/schema.js";
import { runOperation, testContext } from "../../test-support/graphql.js";
import { createTestDb } from "../../test-support/pglite.js";

const REGISTER = `mutation Register($input: RegisterInput!) {
	register(input: $input) { id email role }
}`;
const LOGIN = `mutation Login($input: LoginInput!) {
	login(input: $input) { id email role }
}`;
const ME = "query Me { me { id email role } }";
const SIGNOUT = "mutation Signout { signout { message } }";

let db: DbClient;

beforeEach(async () => {
	db = await createTestDb();
});

/** Seed a user with a real bcrypt hash, as register would. */
async function seedUser(email: string, password: string) {
	const [row] = await db
		.insert(user)
		.values({ email, password: await hashPassword(password) })
		.returning();
	if (!row) {
		throw new Error("seed failed");
	}
	return row;
}

test("register creates a CUSTOMER, hashes the password, and starts a session", async () => {
	const issueSession = vi.fn();
	const result = await runOperation(
		REGISTER,
		testContext(db, { issueSession }),
		{
			input: { email: "shopper@wear.test", password: "hunter2" },
		},
	);

	expect(result.errors).toBeUndefined();
	const registered = result.data?.register as {
		id: string;
		email: string;
		role: string;
	};
	expect(registered.email).toBe("shopper@wear.test");
	expect(registered.role).toBe("CUSTOMER");

	// The session was started for the new user, keyed by id + email.
	expect(issueSession).toHaveBeenCalledWith({
		id: registered.id,
		email: "shopper@wear.test",
	});

	// Password is stored as a bcrypt hash, never the plaintext.
	const [stored] = await db
		.select()
		.from(user)
		.where(eq(user.id, registered.id));
	expect(stored?.password).not.toBe("hunter2");
	expect(await verifyPassword("hunter2", stored?.password ?? "")).toBe(true);
});

test("register rejects an already-taken email", async () => {
	await seedUser("taken@wear.test", "hunter2");

	const result = await runOperation(REGISTER, testContext(db), {
		input: { email: "taken@wear.test", password: "another1" },
	});

	// A non-null field that throws nulls the whole `data` payload.
	expect(result.data).toBeNull();
	expect(result.errors?.[0]?.message).toBe("Email already in use");
});

test("register rejects a malformed email before touching the database", async () => {
	const result = await runOperation(REGISTER, testContext(db), {
		input: { email: "not-an-email", password: "hunter2" },
	});

	expect(result.errors).toBeDefined();
	const count = await db.$count(user);
	expect(count).toBe(0);
});

test("register rejects a password shorter than 6 characters", async () => {
	const result = await runOperation(REGISTER, testContext(db), {
		input: { email: "shorty@wear.test", password: "12345" },
	});

	expect(result.errors).toBeDefined();
	const count = await db.$count(user);
	expect(count).toBe(0);
});

test("login returns the user and starts a session on valid credentials", async () => {
	const seeded = await seedUser("member@wear.test", "hunter2");
	const issueSession = vi.fn();

	const result = await runOperation(LOGIN, testContext(db, { issueSession }), {
		input: { email: "member@wear.test", password: "hunter2" },
	});

	expect(result.errors).toBeUndefined();
	const login = result.data?.login as { id: string } | undefined;
	expect(login?.id).toBe(seeded.id);
	expect(issueSession).toHaveBeenCalledWith({
		id: seeded.id,
		email: "member@wear.test",
	});
});

test("login rejects a wrong password without leaking which field was wrong", async () => {
	await seedUser("member@wear.test", "hunter2");
	const issueSession = vi.fn();

	const result = await runOperation(LOGIN, testContext(db, { issueSession }), {
		input: { email: "member@wear.test", password: "wrongpass" },
	});

	expect(result.data).toBeNull();
	expect(result.errors?.[0]?.message).toBe("Invalid email or password");
	expect(issueSession).not.toHaveBeenCalled();
});

test("login rejects an unknown email with the same generic error", async () => {
	const result = await runOperation(LOGIN, testContext(db), {
		input: { email: "ghost@wear.test", password: "hunter2" },
	});

	expect(result.data).toBeNull();
	expect(result.errors?.[0]?.message).toBe("Invalid email or password");
});

test("me returns null for an anonymous request", async () => {
	const result = await runOperation(ME, testContext(db));

	expect(result.errors).toBeUndefined();
	expect(result.data?.me).toBeNull();
});

test("me returns the context user for an authenticated request", async () => {
	const seeded = await seedUser("member@wear.test", "hunter2");

	const result = await runOperation(ME, testContext(db, { userId: seeded.id }));

	expect(result.errors).toBeUndefined();
	expect(result.data?.me).toMatchObject({
		id: seeded.id,
		email: "member@wear.test",
		role: "CUSTOMER",
	});
});

test("signout clears the session and reports success", async () => {
	const clearSession = vi.fn();

	const result = await runOperation(SIGNOUT, testContext(db, { clearSession }));

	expect(result.errors).toBeUndefined();
	const signout = result.data?.signout as { message: string } | undefined;
	expect(signout?.message).toBe("Successfully signed out");
	expect(clearSession).toHaveBeenCalledOnce();
});

test("the password hash is never exposed through the User type", async () => {
	const seeded = await seedUser("member@wear.test", "hunter2");

	const result = await runOperation(
		"query { me { password } }",
		testContext(db, { userId: seeded.id }),
	);

	expect(result.errors?.[0]?.message).toMatch(/Unknown field password/);
});
