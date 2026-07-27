import { eq } from "drizzle-orm";
import { beforeEach, expect, test, vi } from "vitest";
import { hashPassword, verifyPassword } from "../../auth/password.js";
import type { DbClient } from "../../db/client.js";
import { user } from "../../db/schema.js";
import type { Mailer } from "../../mail/mailer.js";
import { runOperation, testContext } from "../../test-support/graphql.js";
import { createTestDb } from "../../test-support/pglite.js";

const RESET_PASSWORD = `mutation ResetPassword($input: ResetPasswordInput!) {
	resetPassword(input: $input) { message }
}`;
const CHANGE_PASSWORD = `mutation ChangePassword($input: ChangePasswordInput!) {
	changePassword(input: $input) { message }
}`;

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

/** A `Mailer` whose single method is a spy, for asserting on the send. */
function spyMailer(): Mailer & {
	sendPasswordResetEmail: ReturnType<typeof vi.fn>;
} {
	return { sendPasswordResetEmail: vi.fn(async () => {}) };
}

test("resetPassword stores a token with a future expiry and mails it to the user", async () => {
	await seedUser("forgot@wear.test", "hunter2");
	const mailer = spyMailer();

	const result = await runOperation(
		RESET_PASSWORD,
		testContext(db, { mailer }),
		{ input: { email: "forgot@wear.test" } },
	);

	expect(result.errors).toBeUndefined();
	expect(result.data?.resetPassword).toMatchObject({
		message: expect.any(String),
	});

	// The mailer was invoked once, with the account email and a token.
	expect(mailer.sendPasswordResetEmail).toHaveBeenCalledOnce();
	const [to, token] = mailer.sendPasswordResetEmail.mock.calls[0] ?? [];
	expect(to).toBe("forgot@wear.test");
	expect(token).toEqual(expect.any(String));
	expect((token as string).length).toBeGreaterThan(0);

	// The stored token matches what was emailed, with an expiry in the future.
	const [row] = await db
		.select()
		.from(user)
		.where(eq(user.email, "forgot@wear.test"));
	expect(row?.resetToken).toBe(token);
	expect(row?.resetTokenExpiry?.getTime()).toBeGreaterThan(Date.now());
});

test("resetPassword does not reveal whether an email exists and mails nothing for an unknown account", async () => {
	const mailer = spyMailer();

	const result = await runOperation(
		RESET_PASSWORD,
		testContext(db, { mailer }),
		{ input: { email: "ghost@wear.test" } },
	);

	// Same generic success as the happy path — no enumeration oracle — and no
	// mail is sent because there is no account to reset.
	expect(result.errors).toBeUndefined();
	expect(result.data?.resetPassword).toMatchObject({
		message: expect.any(String),
	});
	expect(mailer.sendPasswordResetEmail).not.toHaveBeenCalled();
});

test("request→consume happy path: a valid token re-hashes the password and clears the token", async () => {
	const seeded = await seedUser("forgot@wear.test", "oldpass1");
	const mailer = spyMailer();

	await runOperation(RESET_PASSWORD, testContext(db, { mailer }), {
		input: { email: "forgot@wear.test" },
	});
	const [, token] = mailer.sendPasswordResetEmail.mock.calls[0] ?? [];

	const result = await runOperation(CHANGE_PASSWORD, testContext(db), {
		input: { token, password: "newpass9" },
	});

	expect(result.errors).toBeUndefined();
	expect(result.data?.changePassword).toMatchObject({
		message: expect.any(String),
	});

	const [row] = await db.select().from(user).where(eq(user.id, seeded.id));
	// New password verifies, the old one no longer does.
	expect(await verifyPassword("newpass9", row?.password ?? "")).toBe(true);
	expect(await verifyPassword("oldpass1", row?.password ?? "")).toBe(false);
	// The token is consumed — both columns cleared.
	expect(row?.resetToken).toBeNull();
	expect(row?.resetTokenExpiry).toBeNull();
});

test("changePassword rejects an expired token and leaves the password untouched", async () => {
	const seeded = await seedUser("forgot@wear.test", "oldpass1");
	// Simulate a token issued over an hour ago.
	await db
		.update(user)
		.set({
			resetToken: "expired-token",
			resetTokenExpiry: new Date(Date.now() - 60_000),
		})
		.where(eq(user.id, seeded.id));

	const result = await runOperation(CHANGE_PASSWORD, testContext(db), {
		input: { token: "expired-token", password: "newpass9" },
	});

	expect(result.data).toBeNull();
	expect(result.errors?.[0]?.message).toBe("Invalid or expired reset token");

	const [row] = await db.select().from(user).where(eq(user.id, seeded.id));
	// Password unchanged; the expired token is left as-is (not silently cleared).
	expect(await verifyPassword("oldpass1", row?.password ?? "")).toBe(true);
});

test("changePassword rejects a token that matches no user", async () => {
	await seedUser("forgot@wear.test", "oldpass1");

	const result = await runOperation(CHANGE_PASSWORD, testContext(db), {
		input: { token: "never-issued", password: "newpass9" },
	});

	expect(result.data).toBeNull();
	expect(result.errors?.[0]?.message).toBe("Invalid or expired reset token");
});
