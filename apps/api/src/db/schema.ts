import { pgTable, text, uuid } from "drizzle-orm/pg-core";

/**
 * Walking-skeleton table (#45). One trivial entity that proves the Drizzle →
 * Pothos → Yoga → pglite stack end-to-end before the real 6-entity domain
 * (#46+) lands. Follows the domain conventions the later slices reuse:
 * explicit snake_case column names and uuid primary keys.
 */
export const greeting = pgTable("greeting", {
	id: uuid("id").primaryKey().defaultRandom(),
	message: text("message").notNull(),
});
