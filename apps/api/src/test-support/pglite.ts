import { PGlite } from "@electric-sql/pglite";
import { pushSchema } from "drizzle-kit/api-postgres";
import { drizzle } from "drizzle-orm/pglite";
import type { DbClient } from "../db/client.js";
import { relations } from "../db/relations.js";
import * as schema from "../db/schema.js";

/**
 * Per-run test database: an in-process pglite (WASM Postgres, #35) with the
 * Drizzle schema materialized via `drizzle-kit`'s `pushSchema` — the DDL
 * equivalent of `drizzle-kit push`, since #34 keeps no committed SQL to replay.
 *
 * Every later slice reuses this harness: build a fresh db, seed rows, then fire
 * GraphQL operations through the assembled schema with `{ db }` as context.
 */
export async function createTestDb(): Promise<DbClient> {
	const client = new PGlite();
	const db = drizzle({ client, relations });

	const { apply } = await pushSchema(schema, db);
	await apply();

	return db;
}
