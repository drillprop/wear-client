import { expect, test } from "vitest";
import {
	readTokenCookie,
	serializeAuthCookie,
	serializeClearAuthCookie,
} from "./cookie.js";
import { SESSION_TTL_SECONDS } from "./session.js";

test("the session cookie is httpOnly with a 7-day max-age", () => {
	const cookie = serializeAuthCookie("jwt-value", false);
	expect(cookie).toContain("token=jwt-value");
	expect(cookie).toContain("HttpOnly");
	expect(cookie).toContain(`Max-Age=${SESSION_TTL_SECONDS}`);
});

test("secure cookies are cross-site (SameSite=None; Secure)", () => {
	const cookie = serializeAuthCookie("jwt-value", true);
	expect(cookie).toContain("SameSite=None");
	expect(cookie).toContain("Secure");
});

test("insecure (dev) cookies use SameSite=Lax and omit Secure", () => {
	const cookie = serializeAuthCookie("jwt-value", false);
	expect(cookie).toContain("SameSite=Lax");
	expect(cookie).not.toContain("Secure");
});

test("the clear cookie expires immediately", () => {
	expect(serializeClearAuthCookie(false)).toContain("Max-Age=0");
});

test("readTokenCookie extracts the token from a Cookie header", () => {
	expect(readTokenCookie("foo=bar; token=abc123; baz=qux")).toBe("abc123");
});

test("readTokenCookie returns null when the token is absent or the header empty", () => {
	expect(readTokenCookie("foo=bar")).toBeNull();
	expect(readTokenCookie(null)).toBeNull();
	expect(readTokenCookie(undefined)).toBeNull();
});
