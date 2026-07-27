import { internalApiHeaders, internalApiUrl } from "../../lib/internal-api";

/**
 * Same-origin GraphQL proxy (#32). The browser Apollo client POSTs operations
 * here — a route handler on Next's server — which forwards them to the internal
 * API, injecting the shared secret server-side. The API is never browser-facing,
 * cookie auth stays first-party, and there is no CORS.
 */
export async function POST(request: Request): Promise<Response> {
	const upstream = await fetch(internalApiUrl(), {
		method: "POST",
		headers: {
			"content-type": request.headers.get("content-type") ?? "application/json",
			// Forward the browser's first-party session cookie and inject the shared
			// secret on the server→API hop.
			...internalApiHeaders(request.headers.get("cookie") ?? ""),
		},
		body: await request.text(),
	});

	// Rebuild the response headers rather than passing upstream's through: keep
	// content-type and any Set-Cookie (session start/clear), but drop hop-by-hop
	// headers like content-encoding that would mismatch the re-streamed body.
	const headers = new Headers();
	const contentType = upstream.headers.get("content-type");
	if (contentType) {
		headers.set("content-type", contentType);
	}
	for (const cookie of upstream.headers.getSetCookie()) {
		headers.append("set-cookie", cookie);
	}

	return new Response(upstream.body, { status: upstream.status, headers });
}
