import { drizzle } from "drizzle-orm/node-postgres";
import type { PgAsyncDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import { relations } from "./relations.js";

/**
 * Production Drizzle client over node-postgres (`pg`).
 */
export function createDb(connectionString: string) {
	return drizzle({
		connection: connectionString,
		relations,
	});
}

/**
 * The database surface the app and its tests share. Typing against
 * `PgAsyncDatabase` — the base both the node-postgres (production) and pglite
 * (test) drivers extend — lets the pglite harness plug into the same seam
 * without a cast, while keeping the relational query builder fully typed.
 */
export type DbClient = PgAsyncDatabase<PgQueryResultHKT, typeof relations>;
