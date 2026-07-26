import type { DbClient } from "./db/client.js";

/**
 * GraphQL execution context. The skeleton carries only the Drizzle client;
 * slice 2 (#46) adds the authenticated `userId` resolved from the JWT cookie.
 * Injecting `db` through the context is what lets tests drive the built schema
 * against pglite without any HTTP layer.
 */
export interface Context {
	db: DbClient;
}
