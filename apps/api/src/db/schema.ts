import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	unique,
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
 * Beyond the identity core the auth spine needs, this table carries the columns
 * its dependent slices add: `newsletter` and the 1:1 `address` relation for
 * account management (#48), and the reset-token pair for password recovery (#49).
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
	// Password-reset flow (#49): a single-use token and its expiry. Null when no
	// reset is outstanding; both are cleared once a reset is consumed. Neither is
	// ever exposed through the GraphQL `User` type.
	resetToken: text("reset_token"),
	resetTokenExpiry: timestamp("reset_token_expiry"),
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

/**
 * `Gender` and `Category` — the shop taxonomy an item is filed under. Both keep
 * the legacy server's enum values verbatim so the web contract's `Gender` /
 * `Category` GraphQL enums map straight through (#47).
 */
export const gender = pgEnum("gender", ["MAN", "WOMAN"]);
export const category = pgEnum("category", [
	"TROUSERS",
	"DRESS",
	"BLOUSE",
	"TSHIRT",
	"SHIRT",
	"JACKET",
	"BLAZER",
	"SWEATSHIRT",
]);

/** `SizeSymbol` — the per-item stock-keeping sizes, smallest to largest. */
export const sizeSymbol = pgEnum("size_symbol", [
	"XS",
	"S",
	"M",
	"L",
	"XL",
	"XXL",
]);

/**
 * The `item` entity — the catalogue read model (#47). `price` is an `integer`
 * (whole currency units; the GraphQL `Item.price` widens it to `Float` to keep
 * the legacy contract). `createdBy` records the staff member who added the item
 * and is exposed only to staff via the GraphQL type's scope gate.
 *
 * The write path (createItem/updateItem/deleteItem) lands in #50; this slice
 * provisions the table and its read queries only.
 */
export const item = pgTable("item", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name").notNull(),
	description: text("description"),
	price: integer("price").notNull(),
	imageUrl: text("image_url").notNull(),
	category: category("category").notNull(),
	gender: gender("gender").notNull(),
	createdById: uuid("created_by")
		.notNull()
		.references(() => user.id),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

/**
 * The `size` entity — an item's stock for one `SizeSymbol`. Unique on
 * `(size_symbol, item)` so an item can't carry the same size twice; `quantity`
 * is the on-hand count and drives the `available` catalogue filter (a size with
 * `quantity > 0`).
 */
export const size = pgTable(
	"size",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		sizeSymbol: sizeSymbol("size_symbol").notNull(),
		quantity: integer("quantity").notNull().default(0),
		itemId: uuid("item")
			.notNull()
			.references(() => item.id),
	},
	(t) => [unique("size_symbol_item_unique").on(t.sizeSymbol, t.itemId)],
);

/**
 * `OrderStatus` — an order's lifecycle, in fulfilment order (#51). PENDING is the
 * state a freshly-placed order lands in (and the only one a customer may still
 * cancel); an admin advances it through PAID → SENT → COMPLETED. Values mirror
 * the legacy contract's `OrderStatus` enum verbatim.
 */
export const orderStatus = pgEnum("order_status", [
	"PENDING",
	"PAID",
	"SENT",
	"COMPLETED",
]);

/**
 * The `order` entity — a customer's placed order (#51). `orderedBy` is the
 * customer who placed it; deleting that account cascades their orders away
 * (mirroring the address FK), so `deleteAccount` never leaves an orphan. A new
 * order starts PENDING — the only status a customer may still cancel — and an
 * admin advances it via `manageOrder`.
 */
export const order = pgTable("order", {
	id: uuid("id").primaryKey().defaultRandom(),
	status: orderStatus("status").notNull().default("PENDING"),
	orderedById: uuid("ordered_by")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

/**
 * The `ordered_item` entity — one unit of one item at a chosen `SizeSymbol`
 * within an order (#51). An order's line items are the rows sharing its `order`
 * FK; ordering two of the same item/size records two rows. Both FKs cascade on
 * delete, so removing an order takes its line items with it and deleting a
 * catalogue item clears it from every order (the legacy "cascade on order/item
 * delete" contract). `size_symbol` is the size the customer chose, copied onto
 * the line so it stands independent of the item's live stock.
 */
export const orderedItem = pgTable("ordered_item", {
	id: uuid("id").primaryKey().defaultRandom(),
	sizeSymbol: sizeSymbol("size_symbol").notNull(),
	orderId: uuid("order")
		.notNull()
		.references(() => order.id, { onDelete: "cascade" }),
	itemId: uuid("item")
		.notNull()
		.references(() => item.id, { onDelete: "cascade" }),
});
