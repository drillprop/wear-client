import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
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

const yoga = createYoga<Context>({
	schema,
	context: () => ({ db }),
});

const server = createServer(yoga);

server.listen(config.port, () => {
	console.log(
		`API ready at http://localhost:${config.port}${yoga.graphqlEndpoint}`,
	);
});
