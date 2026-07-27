import { expect, test } from "vitest";
import { loadConfig } from "./config.js";

const base = { DATABASE_URL: "postgres://x", JWT_SECRET: "s3cret" };

test("loadConfig reads DATABASE_URL and JWT_SECRET and defaults the port", () => {
	const config = loadConfig(base);
	expect(config).toEqual({
		databaseUrl: "postgres://x",
		jwtSecret: "s3cret",
		port: 4000,
	});
});

test("loadConfig parses a provided PORT", () => {
	const config = loadConfig({ ...base, PORT: "5000" });
	expect(config.port).toBe(5000);
});

test("loadConfig throws when DATABASE_URL is missing", () => {
	expect(() => loadConfig({ JWT_SECRET: "s3cret" })).toThrow(
		"DATABASE_URL is required",
	);
});

test("loadConfig throws when JWT_SECRET is missing", () => {
	expect(() => loadConfig({ DATABASE_URL: "postgres://x" })).toThrow(
		"JWT_SECRET is required",
	);
});

test("loadConfig throws on a non-numeric PORT instead of yielding NaN", () => {
	expect(() => loadConfig({ ...base, PORT: "not-a-port" })).toThrow(
		"Invalid PORT",
	);
});
