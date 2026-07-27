import { eq } from "drizzle-orm";
import { beforeEach, expect, test } from "vitest";
import type { DbClient } from "../../db/client.js";
import { item, size, user } from "../../db/schema.js";
import { runOperation, testContext } from "../../test-support/graphql.js";
import { createTestDb } from "../../test-support/pglite.js";

const CREATE = `mutation CreateItem($input: CreateItemInput!) {
	createItem(input: $input) {
		id name price imageUrl category gender description
		sizes { sizeSymbol quantity }
	}
}`;

const UPDATE = `mutation UpdateItem($input: EditItemInput!) {
	updateItem(input: $input) {
		id name price imageUrl category
		sizes { sizeSymbol quantity }
	}
}`;

const DELETE = `mutation DeleteItem($id: ID!) {
	deleteItem(id: $id) { message }
}`;

interface ItemResult {
	id: string;
	name: string;
	price: number;
	imageUrl: string;
	category: string;
	gender: string;
	description: string | null;
	sizes: Array<{ sizeSymbol: string; quantity: number }>;
}

let db: DbClient;
let staffId: string;
let seq = 0;

beforeEach(async () => {
	db = await createTestDb();
	staffId = await seedUser("EMPLOYEE");
});

async function seedUser(role: "ADMIN" | "EMPLOYEE" | "CUSTOMER") {
	const [row] = await db
		.insert(user)
		.values({ email: `u${seq++}@wear.test`, password: "hash", role })
		.returning();
	if (!row) {
		throw new Error("seed user failed");
	}
	return row.id;
}

interface SeedItem {
	name?: string;
	price?: number;
	createdById?: string;
}

async function seedItem(overrides: SeedItem = {}) {
	const [row] = await db
		.insert(item)
		.values({
			name: overrides.name ?? "Plain Tee",
			price: overrides.price ?? 100,
			imageUrl: "https://img.wear.test/x.jpg",
			category: "TSHIRT",
			gender: "MAN",
			createdById: overrides.createdById ?? staffId,
		})
		.returning();
	if (!row) {
		throw new Error("seed item failed");
	}
	return row;
}

function sizesOf(itemId: string) {
	return db
		.select({ sizeSymbol: size.sizeSymbol, quantity: size.quantity })
		.from(size)
		.where(eq(size.itemId, itemId));
}

const asStaff = () => testContext(db, { userId: staffId });

test("createItem stocks an item with its nested sizes", async () => {
	const result = await runOperation(CREATE, asStaff(), {
		input: {
			name: "Linen Shirt",
			price: 120,
			imageUrl: "https://img.wear.test/shirt.jpg",
			category: "SHIRT",
			gender: "WOMAN",
			description: "breezy",
			sizes: [
				{ sizeSymbol: "S", quantity: 4 },
				{ sizeSymbol: "M", quantity: 0 },
			],
		},
	});

	expect(result.errors).toBeUndefined();
	const created = result.data?.createItem as ItemResult;
	expect(created.name).toBe("Linen Shirt");
	expect(created.price).toBe(120);
	expect(created.category).toBe("SHIRT");
	expect(created.gender).toBe("WOMAN");
	expect(created.description).toBe("breezy");
	expect(created.sizes.map((s) => [s.sizeSymbol, s.quantity]).sort()).toEqual([
		["M", 0],
		["S", 4],
	]);

	// The authoring staff member is recorded as createdBy.
	const [row] = await db
		.select({ createdById: item.createdById })
		.from(item)
		.where(eq(item.id, created.id));
	expect(row?.createdById).toBe(staffId);
});

test("createItem works without any sizes", async () => {
	const result = await runOperation(CREATE, asStaff(), {
		input: {
			name: "Sizeless",
			price: 50,
			imageUrl: "https://img.wear.test/x.jpg",
			category: "DRESS",
			gender: "WOMAN",
		},
	});

	expect(result.errors).toBeUndefined();
	const created = result.data?.createItem as ItemResult;
	expect(created.description).toBeNull();
	expect(created.sizes).toEqual([]);
});

test("createItem rejects a duplicate name", async () => {
	await seedItem({ name: "Taken" });

	const result = await runOperation(CREATE, asStaff(), {
		input: {
			name: "Taken",
			price: 20,
			imageUrl: "https://img.wear.test/x.jpg",
			category: "TSHIRT",
			gender: "MAN",
		},
	});

	expect(result.errors?.[0]?.message).toMatch(/name.*use|already/i);
	// No second row was written.
	const rows = await db.select({ id: item.id }).from(item);
	expect(rows).toHaveLength(1);
});

test("createItem is rejected for a customer and for an anonymous caller", async () => {
	const customerId = await seedUser("CUSTOMER");
	const input = {
		name: "Nope",
		price: 10,
		imageUrl: "https://img.wear.test/x.jpg",
		category: "TSHIRT",
		gender: "MAN",
	};

	const asCustomer = await runOperation(
		CREATE,
		testContext(db, { userId: customerId }),
		{ input },
	);
	expect(asCustomer.errors?.[0]?.message).toMatch(/not authorized/i);

	const asAnon = await runOperation(CREATE, testContext(db), { input });
	expect(asAnon.errors?.[0]?.message).toMatch(/not authorized/i);

	// Nothing was created either way.
	expect(await db.select({ id: item.id }).from(item)).toHaveLength(0);
});

test("updateItem updates the item's scalar fields", async () => {
	const seeded = await seedItem({ name: "Old", price: 100 });

	const result = await runOperation(UPDATE, asStaff(), {
		input: {
			id: seeded.id,
			name: "New",
			price: 250,
			imageUrl: "https://img.wear.test/new.jpg",
			category: "JACKET",
		},
	});

	expect(result.errors).toBeUndefined();
	const updated = result.data?.updateItem as ItemResult;
	expect(updated.name).toBe("New");
	expect(updated.price).toBe(250);
	expect(updated.imageUrl).toBe("https://img.wear.test/new.jpg");
	expect(updated.category).toBe("JACKET");
});

test("updateItem leaves omitted fields untouched", async () => {
	const seeded = await seedItem({ name: "Keep", price: 100 });

	const result = await runOperation(UPDATE, asStaff(), {
		input: { id: seeded.id, price: 175 },
	});

	expect(result.errors).toBeUndefined();
	const updated = result.data?.updateItem as ItemResult;
	expect(updated.name).toBe("Keep");
	expect(updated.price).toBe(175);
});

test("updateItem upserts sizes: adds new symbols and updates existing quantities", async () => {
	const seeded = await seedItem();
	await db
		.insert(size)
		.values({ itemId: seeded.id, sizeSymbol: "M", quantity: 2 });

	const result = await runOperation(UPDATE, asStaff(), {
		input: {
			id: seeded.id,
			sizes: [
				{ sizeSymbol: "M", quantity: 9 }, // existing → updated
				{ sizeSymbol: "L", quantity: 3 }, // new → inserted
			],
		},
	});

	expect(result.errors).toBeUndefined();
	const rows = await sizesOf(seeded.id);
	expect(rows.map((r) => [r.sizeSymbol, r.quantity]).sort()).toEqual([
		["L", 3],
		["M", 9],
	]);
});

test("updateItem rejects a rename onto another item's name", async () => {
	await seedItem({ name: "Taken" });
	const target = await seedItem({ name: "Original" });

	const result = await runOperation(UPDATE, asStaff(), {
		input: { id: target.id, name: "Taken" },
	});

	expect(result.errors?.[0]?.message).toMatch(/name.*use|already/i);
	const [row] = await db
		.select({ name: item.name })
		.from(item)
		.where(eq(item.id, target.id));
	expect(row?.name).toBe("Original");
});

test("updateItem allows re-saving an item under its own name", async () => {
	const seeded = await seedItem({ name: "Steady", price: 100 });

	const result = await runOperation(UPDATE, asStaff(), {
		input: { id: seeded.id, name: "Steady", price: 200 },
	});

	expect(result.errors).toBeUndefined();
	const updated = result.data?.updateItem as ItemResult;
	expect(updated.price).toBe(200);
});

test("updateItem is rejected for a customer and an anonymous caller", async () => {
	const seeded = await seedItem({ name: "Guarded" });
	const customerId = await seedUser("CUSTOMER");

	const asCustomer = await runOperation(
		UPDATE,
		testContext(db, { userId: customerId }),
		{ input: { id: seeded.id, name: "Hacked" } },
	);
	expect(asCustomer.errors?.[0]?.message).toMatch(/not authorized/i);

	const asAnon = await runOperation(UPDATE, testContext(db), {
		input: { id: seeded.id, name: "Hacked" },
	});
	expect(asAnon.errors?.[0]?.message).toMatch(/not authorized/i);

	const [row] = await db
		.select({ name: item.name })
		.from(item)
		.where(eq(item.id, seeded.id));
	expect(row?.name).toBe("Guarded");
});

test("updateItem errors on an unknown id", async () => {
	const result = await runOperation(UPDATE, asStaff(), {
		input: { id: crypto.randomUUID(), name: "Ghost" },
	});

	expect(result.errors?.[0]?.message).toMatch(/not found/i);
});

test("deleteItem removes the item and cascades to its sizes", async () => {
	const seeded = await seedItem();
	await db.insert(size).values([
		{ itemId: seeded.id, sizeSymbol: "M", quantity: 2 },
		{ itemId: seeded.id, sizeSymbol: "L", quantity: 1 },
	]);

	const result = await runOperation(DELETE, asStaff(), { id: seeded.id });

	expect(result.errors).toBeUndefined();
	const payload = result.data?.deleteItem as { message: string };
	expect(payload.message).toBeTruthy();
	expect(await db.select({ id: item.id }).from(item)).toHaveLength(0);
	expect(await sizesOf(seeded.id)).toHaveLength(0);
});

test("deleteItem is rejected for a customer and an anonymous caller", async () => {
	const seeded = await seedItem();
	const customerId = await seedUser("CUSTOMER");

	const asCustomer = await runOperation(
		DELETE,
		testContext(db, { userId: customerId }),
		{ id: seeded.id },
	);
	expect(asCustomer.errors?.[0]?.message).toMatch(/not authorized/i);

	const asAnon = await runOperation(DELETE, testContext(db), { id: seeded.id });
	expect(asAnon.errors?.[0]?.message).toMatch(/not authorized/i);

	expect(await db.select({ id: item.id }).from(item)).toHaveLength(1);
});

test("deleteItem errors on an unknown id", async () => {
	const result = await runOperation(DELETE, asStaff(), {
		id: crypto.randomUUID(),
	});

	expect(result.errors?.[0]?.message).toMatch(/not found/i);
});
