import { expect, test } from "vitest";
import { loadConfig } from "./config.js";

test("loadConfig reads DATABASE_URL and defaults the port", () => {
	const config = loadConfig({ DATABASE_URL: "postgres://x" });
	expect(config).toEqual({ databaseUrl: "postgres://x", port: 4000 });
});

test("loadConfig parses a provided PORT", () => {
	const config = loadConfig({ DATABASE_URL: "postgres://x", PORT: "5000" });
	expect(config.port).toBe(5000);
});

test("loadConfig throws when DATABASE_URL is missing", () => {
	expect(() => loadConfig({})).toThrow("DATABASE_URL is required");
});

test("loadConfig throws on a non-numeric PORT instead of yielding NaN", () => {
	expect(() =>
		loadConfig({ DATABASE_URL: "postgres://x", PORT: "not-a-port" }),
	).toThrow("Invalid PORT");
});
