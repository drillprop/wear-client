import { expect, test } from "vitest";
import { loadConfig } from "./config.js";

const mailEnv = {
	MAIL_HOST: "smtp.wear.test",
	MAIL_USER: "mailer",
	MAIL_PASS: "smtp-secret",
};
const base = { DATABASE_URL: "postgres://x", JWT_SECRET: "s3cret", ...mailEnv };

test("loadConfig reads the core settings and defaults port + mail port/from", () => {
	const config = loadConfig(base);
	expect(config).toEqual({
		databaseUrl: "postgres://x",
		jwtSecret: "s3cret",
		port: 4000,
		mail: {
			host: "smtp.wear.test",
			port: 587,
			user: "mailer",
			pass: "smtp-secret",
			from: "no-reply@wear.test",
		},
	});
});

test("loadConfig parses a provided PORT", () => {
	const config = loadConfig({ ...base, PORT: "5000" });
	expect(config.port).toBe(5000);
});

test("loadConfig parses a provided MAIL_PORT and MAIL_FROM", () => {
	const config = loadConfig({
		...base,
		MAIL_PORT: "2525",
		MAIL_FROM: "hello@wear.test",
	});
	expect(config.mail.port).toBe(2525);
	expect(config.mail.from).toBe("hello@wear.test");
});

test("loadConfig throws when DATABASE_URL is missing", () => {
	expect(() => loadConfig({ ...mailEnv, JWT_SECRET: "s3cret" })).toThrow(
		"DATABASE_URL is required",
	);
});

test("loadConfig throws when JWT_SECRET is missing", () => {
	expect(() =>
		loadConfig({ ...mailEnv, DATABASE_URL: "postgres://x" }),
	).toThrow("JWT_SECRET is required");
});

test("loadConfig throws on a non-numeric PORT instead of yielding NaN", () => {
	expect(() => loadConfig({ ...base, PORT: "not-a-port" })).toThrow(
		"Invalid PORT",
	);
});

test("loadConfig throws when MAIL_HOST is missing", () => {
	const { MAIL_HOST: _omit, ...withoutHost } = base;
	expect(() => loadConfig(withoutHost)).toThrow("MAIL_HOST is required");
});

test("loadConfig throws when MAIL_USER is missing", () => {
	const { MAIL_USER: _omit, ...withoutUser } = base;
	expect(() => loadConfig(withoutUser)).toThrow("MAIL_USER is required");
});

test("loadConfig throws when MAIL_PASS is missing", () => {
	const { MAIL_PASS: _omit, ...withoutPass } = base;
	expect(() => loadConfig(withoutPass)).toThrow("MAIL_PASS is required");
});

test("loadConfig throws on a non-numeric MAIL_PORT", () => {
	expect(() => loadConfig({ ...base, MAIL_PORT: "not-a-port" })).toThrow(
		"Invalid MAIL_PORT",
	);
});
