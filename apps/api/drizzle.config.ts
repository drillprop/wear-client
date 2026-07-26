import { defineConfig } from "drizzle-kit";

/**
 * `drizzle-kit push` config (#34) — the schema is applied straight to a fresh
 * database with no committed SQL migrations. `DATABASE_URL` is box-local (#32).
 */
export default defineConfig({
	dialect: "postgresql",
	schema: "./src/db/schema.ts",
	dbCredentials: {
		url: process.env.DATABASE_URL ?? "",
	},
});
