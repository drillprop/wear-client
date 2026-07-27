import "server-only";

/**
 * The internal API origin (#32) — server-side only, never exposed to the
 * browser. Both server→API hops (the RSC Apollo client and the same-origin proxy
 * route handler) resolve it here so the missing-config guard is uniform.
 */
export function internalApiUrl(): string {
	const url = process.env.INTERNAL_API_URL;
	if (!url) {
		throw new Error("INTERNAL_API_URL is not configured");
	}
	return url;
}

/**
 * Headers for the server→API hop (#32): forward the caller's first-party session
 * cookie and inject the shared secret. Kept in one place so the auth contract has
 * a single source of truth as #32 hardens (e.g. real secret enforcement).
 */
export function internalApiHeaders(cookie: string): Record<string, string> {
	return {
		cookie,
		"x-shared-secret": process.env.API_SHARED_SECRET ?? "",
	};
}
