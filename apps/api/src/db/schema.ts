import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * `UserRole` — the three roles the authorization scopes derive from (#46).
 * ADMIN and EMPLOYEE together form "staff"; CUSTOMER is the default on register.
 */
export const userRole = pgEnum("user_role", ["ADMIN", "EMPLOYEE", "CUSTOMER"]);

/**
 * The `user` entity — the authentication spine (#46). Columns keep the legacy
 * server's snake_case names and uuid PK so the contract stays faithful, but the
 * table is provisioned fresh via `drizzle-kit push` (#34). `password` holds a
 * bcrypt hash and is never exposed through the GraphQL `User` type.
 *
 * Feature-specific columns (newsletter, reset-token, address relation) land with
 * their own slices (#48/#49); this table carries only the identity core the auth
 * spine and every gated operation need.
 */
export const user = pgTable("user", {
	id: uuid("id").primaryKey().defaultRandom(),
	// Unique at the DB level so the resolver's uniqueness check can't be raced by
	// two concurrent registrations — the constraint is the authoritative backstop.
	email: text("email").notNull().unique(),
	password: text("password").notNull(),
	firstName: text("first_name"),
	lastName: text("last_name"),
	phoneNumber: text("phone_number"),
	role: userRole("role").notNull().default("CUSTOMER"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});
