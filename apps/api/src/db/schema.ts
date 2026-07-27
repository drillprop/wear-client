import {
	boolean,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

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
 * The reset-token columns land with password recovery (#49); this slice (#48)
 * adds `newsletter` and the 1:1 `address` relation for account management.
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
	// A subscription flag is inherently on/off — modelled non-null with a `false`
	// default rather than the legacy nullable Boolean, so the resolver never has
	// to reason about a third "unknown" state.
	newsletter: boolean("newsletter").notNull().default(false),
	role: userRole("role").notNull().default("CUSTOMER"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

/**
 * The `address` entity — a customer's single shipping/billing address (#48),
 * 1:1 with `user`. The 1:1 is enforced by the unique FK on `user_id`; deleting a
 * user cascades to their address so `deleteAccount` leaves no orphan row. Every
 * field is nullable so `updateAddress` can persist a partially-filled form, which
 * mirrors the legacy contract (all Address fields optional).
 */
export const address = pgTable("address", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: uuid("user_id")
		.notNull()
		.unique()
		.references(() => user.id, { onDelete: "cascade" }),
	addressLine1: text("address_line1"),
	addressLine2: text("address_line2"),
	zipCode: text("zip_code"),
	city: text("city"),
	country: text("country"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});
