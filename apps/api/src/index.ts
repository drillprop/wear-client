import { createServer } from "node:http";
import { createYoga, type Plugin } from "graphql-yoga";
import {
	readTokenCookie,
	serializeAuthCookie,
	serializeClearAuthCookie,
} from "./auth/cookie.js";
import { createUserToken, readUserIdFromToken } from "./auth/token.js";
import { loadConfig } from "./config.js";
import type { Context } from "./context.js";
import { createDb } from "./db/client.js";
import { schema } from "./graphql/schema.js";

/**
 * GraphQL Yoga host on `node:http` — no Express/cors/cookie-parser (#39). CORS
 * is intentionally absent; the API is never browser-facing and sits behind the
 * same-origin Next.js proxy (#32).
 */
const config = loadConfig();
const db = createDb(config.databaseUrl);

// Cross-site cookies need SameSite=None; Secure, which only works over https, so
// they're enabled only in production (the proxy is a different origin there).
const secureCookies = process.env.NODE_ENV === "production";

// The context sets Set-Cookie by pushing serialized cookies into a per-request
// buffer; the plugin below drains it onto the outgoing response. Keyed by the
// request object so concurrent requests never cross wires.
const pendingCookies = new WeakMap<Request, string[]>();

const cookiePlugin: Plugin = {
	onResponse({ request, response }) {
		const cookies = pendingCookies.get(request);
		if (!cookies) {
			return;
		}
		for (const cookie of cookies) {
			response.headers.append("set-cookie", cookie);
		}
		pendingCookies.delete(request);
	},
};

const yoga = createYoga<{ request: Request }, Context>({
	schema,
	plugins: [cookiePlugin],
	context: ({ request }) => {
		const cookies: string[] = [];
		pendingCookies.set(request, cookies);

		const token = readTokenCookie(request.headers.get("cookie"));
		const userId = token ? readUserIdFromToken(token, config.jwtSecret) : null;

		return {
			db,
			userId,
			issueSession: (payload) => {
				const jwt = createUserToken(payload, config.jwtSecret);
				cookies.push(serializeAuthCookie(jwt, secureCookies));
			},
			clearSession: () => {
				cookies.push(serializeClearAuthCookie(secureCookies));
			},
		};
	},
});

const server = createServer(yoga);

server.listen(config.port, () => {
	console.log(
		`API ready at http://localhost:${config.port}${yoga.graphqlEndpoint}`,
	);
});
