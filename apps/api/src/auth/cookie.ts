/**
 * Session-cookie serialization for the Yoga HTTP edge (#46). The token lives in
 * an httpOnly cookie so browser JS can't read it; resolvers never touch this —
 * they call the context's `issueSession` / `clearSession` sinks, which serialize
 * through here at the edge. Kept dependency-free — no cookie library — since the
 * format is a fixed handful of attributes.
 */

import { SESSION_TTL_SECONDS } from "./session.js";

/** Cookie name the legacy server used; the web proxy forwards it unchanged. */
export const AUTH_COOKIE_NAME = "token";

/**
 * Cross-site cookies (the production proxy is a different origin) require
 * `SameSite=None; Secure`; local dev over http uses `Lax` without `Secure` so
 * the cookie still sets. Mirrors the legacy `sameSite`/`secure` branching.
 */
function attributes(secure: boolean): string[] {
	const parts = ["HttpOnly", "Path=/", `SameSite=${secure ? "None" : "Lax"}`];
	if (secure) {
		parts.push("Secure");
	}
	return parts;
}

export function serializeAuthCookie(token: string, secure: boolean): string {
	return [
		`${AUTH_COOKIE_NAME}=${token}`,
		`Max-Age=${SESSION_TTL_SECONDS}`,
		...attributes(secure),
	].join("; ");
}

export function serializeClearAuthCookie(secure: boolean): string {
	return [`${AUTH_COOKIE_NAME}=`, "Max-Age=0", ...attributes(secure)].join(
		"; ",
	);
}

/** Pull the raw session token out of a `Cookie` request header, if present. */
export function readTokenCookie(
	cookieHeader: string | null | undefined,
): string | null {
	if (!cookieHeader) {
		return null;
	}
	for (const pair of cookieHeader.split(";")) {
		const eq = pair.indexOf("=");
		if (eq === -1) {
			continue;
		}
		if (pair.slice(0, eq).trim() === AUTH_COOKIE_NAME) {
			return pair.slice(eq + 1).trim();
		}
	}
	return null;
}
