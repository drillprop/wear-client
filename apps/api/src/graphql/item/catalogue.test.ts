import { beforeEach, expect, test } from "vitest";
import type { DbClient } from "../../db/client.js";
import { item, size, user } from "../../db/schema.js";
import { runOperation, testContext } from "../../test-support/graphql.js";
import { createTestDb } from "../../test-support/pglite.js";

const ITEMS = `query Items($where: SearchItemInput) {
	items(where: $where) {
		select { id name price category gender sizes { sizeSymbol quantity } }
		count
		maxPrice
	}
}`;

const SINGLE = `query Item($id: ID!) {
	item(id: $id) {
		id name description price sizes { sizeSymbol quantity }
	}
}`;

const SINGLE_CREATED_BY = `query Item($id: ID!) {
	item(id: $id) { id createdBy { id email } }
}`;

interface ItemsResult {
	select: Array<{
		id: string;
		name: string;
		price: number;
		category: string;
		gender: string;
		sizes: Array<{ sizeSymbol: string; quantity: number }>;
	}>;
	count: number;
	maxPrice: number | null;
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
	category?: (typeof item.category.enumValues)[number];
	gender?: (typeof item.gender.enumValues)[number];
	description?: string;
	createdById?: string;
}

async function seedItem(overrides: SeedItem = {}) {
	const [row] = await db
		.insert(item)
		.values({
			name: overrides.name ?? "Plain Tee",
			price: overrides.price ?? 100,
			imageUrl: "https://img.wear.test/x.jpg",
			category: overrides.category ?? "TSHIRT",
			gender: overrides.gender ?? "MAN",
			description: overrides.description,
			createdById: overrides.createdById ?? staffId,
		})
		.returning();
	if (!row) {
		throw new Error("seed item failed");
	}
	return row;
}

async function seedSize(
	itemId: string,
	sizeSymbol: (typeof size.sizeSymbol.enumValues)[number],
	quantity: number,
) {
	await db.insert(size).values({ itemId, sizeSymbol, quantity });
}

async function runItems(where?: Record<string, unknown>): Promise<ItemsResult> {
	const result = await runOperation(ITEMS, testContext(db), { where });
	expect(result.errors).toBeUndefined();
	return result.data?.items as ItemsResult;
}

test("items with no filter returns the whole catalogue with its count", async () => {
	await seedItem({ name: "One" });
	await seedItem({ name: "Two" });

	const items = await runItems();

	expect(items.count).toBe(2);
	expect(items.select).toHaveLength(2);
});

test("filters by name with a case-insensitive partial match", async () => {
	await seedItem({ name: "Red Linen Shirt" });
	await seedItem({ name: "Blue Denim Jacket" });

	const items = await runItems({ name: "shirt" });

	expect(items.count).toBe(1);
	expect(items.select.map((i) => i.name)).toEqual(["Red Linen Shirt"]);
});

test("filters by category", async () => {
	await seedItem({ name: "Tee", category: "TSHIRT" });
	await seedItem({ name: "Coat", category: "JACKET" });

	const items = await runItems({ category: "JACKET" });

	expect(items.select.map((i) => i.name)).toEqual(["Coat"]);
});

test("filters by gender", async () => {
	await seedItem({ name: "His", gender: "MAN" });
	await seedItem({ name: "Hers", gender: "WOMAN" });

	const items = await runItems({ gender: "WOMAN" });

	expect(items.select.map((i) => i.name)).toEqual(["Hers"]);
});

test("filters by an inclusive price range", async () => {
	await seedItem({ name: "Cheap", price: 50 });
	await seedItem({ name: "Mid", price: 100 });
	await seedItem({ name: "Dear", price: 150 });

	const items = await runItems({ priceFrom: 100, priceTo: 150 });

	expect(items.count).toBe(2);
	expect(items.select.map((i) => i.name).sort()).toEqual(["Dear", "Mid"]);
});

test("filters to items with a size in stock when available is true", async () => {
	const inStock = await seedItem({ name: "Stocked" });
	await seedSize(inStock.id, "M", 3);
	const soldOut = await seedItem({ name: "Sold Out" });
	await seedSize(soldOut.id, "M", 0);
	await seedItem({ name: "Sizeless" }); // no sizes at all

	const items = await runItems({ available: true });

	expect(items.select.map((i) => i.name)).toEqual(["Stocked"]);
	expect(items.count).toBe(1);
});

test("paginates with take and skip over a stable sort", async () => {
	for (const price of [10, 20, 30, 40, 50]) {
		await seedItem({ name: `P${price}`, price });
	}

	const items = await runItems({
		sortBy: "Item.price",
		sortOrder: "ASC",
		take: 2,
		skip: 2,
	});

	expect(items.select.map((i) => i.price)).toEqual([30, 40]);
	// count is the full matching set, not the page.
	expect(items.count).toBe(5);
});

test("sorts by price ascending and descending", async () => {
	for (const price of [30, 10, 20]) {
		await seedItem({ name: `P${price}`, price });
	}

	const asc = await runItems({ sortBy: "Item.price", sortOrder: "ASC" });
	expect(asc.select.map((i) => i.price)).toEqual([10, 20, 30]);

	const desc = await runItems({ sortBy: "Item.price", sortOrder: "DESC" });
	expect(desc.select.map((i) => i.price)).toEqual([30, 20, 10]);
});

test("maxPrice is the top price of the matching set", async () => {
	await seedItem({ price: 50 });
	await seedItem({ price: 150 });
	await seedItem({ price: 100 });

	const items = await runItems();

	expect(items.maxPrice).toBe(150);
});

test("maxPrice ignores the active price range so the slider bound stays put", async () => {
	await seedItem({ name: "Cheap", price: 50 });
	await seedItem({ name: "Dear", price: 150 });

	const items = await runItems({ priceTo: 60 });

	// The page and count honour the range…
	expect(items.count).toBe(1);
	expect(items.select.map((i) => i.name)).toEqual(["Cheap"]);
	// …but maxPrice still reports the catalogue's true ceiling.
	expect(items.maxPrice).toBe(150);
});

test("maxPrice is null when nothing matches", async () => {
	await seedItem({ name: "Tee", category: "TSHIRT" });

	const items = await runItems({ category: "JACKET" });

	expect(items.count).toBe(0);
	expect(items.select).toHaveLength(0);
	expect(items.maxPrice).toBeNull();
});

test("a search term with SQL metacharacters is treated as a literal", async () => {
	await seedItem({ name: "Plain Tee" });

	// A classic injection payload — parameterised, it matches nothing…
	const injected = await runItems({ name: "'; DROP TABLE item; --" });
	expect(injected.count).toBe(0);
	expect(injected.select).toHaveLength(0);

	// …and, crucially, the table is still intact afterwards.
	const survived = await runItems();
	expect(survived.count).toBe(1);
	expect(survived.select.map((i) => i.name)).toEqual(["Plain Tee"]);
});

test("item returns a single item with its sizes", async () => {
	const seeded = await seedItem({ name: "Hoodie", description: "cosy" });
	await seedSize(seeded.id, "M", 2);
	await seedSize(seeded.id, "L", 0);

	const result = await runOperation(SINGLE, testContext(db), {
		id: seeded.id,
	});

	expect(result.errors).toBeUndefined();
	const single = result.data?.item as {
		id: string;
		name: string;
		description: string;
		sizes: Array<{ sizeSymbol: string; quantity: number }>;
	};
	expect(single.id).toBe(seeded.id);
	expect(single.description).toBe("cosy");
	expect(single.sizes).toHaveLength(2);
	expect(single.sizes.map((s) => [s.sizeSymbol, s.quantity]).sort()).toEqual([
		["L", 0],
		["M", 2],
	]);
});

test("item returns null for an unknown id", async () => {
	const result = await runOperation(SINGLE, testContext(db), {
		id: crypto.randomUUID(),
	});

	expect(result.errors).toBeUndefined();
	expect(result.data?.item).toBeNull();
});

test("createdBy is hidden from a customer", async () => {
	const seeded = await seedItem();
	const customerId = await seedUser("CUSTOMER");

	const result = await runOperation(
		SINGLE_CREATED_BY,
		testContext(db, { userId: customerId }),
		{ id: seeded.id },
	);

	expect(result.errors?.[0]?.message).toMatch(/not authorized/i);
	expect(
		(result.data?.item as { createdBy: unknown } | null)?.createdBy ?? null,
	).toBeNull();
});

test("createdBy is hidden from an anonymous caller", async () => {
	const seeded = await seedItem();

	const result = await runOperation(SINGLE_CREATED_BY, testContext(db), {
		id: seeded.id,
	});

	expect(result.errors?.[0]?.message).toMatch(/not authorized/i);
});

test("createdBy is visible to staff", async () => {
	const seeded = await seedItem();

	const result = await runOperation(
		SINGLE_CREATED_BY,
		testContext(db, { userId: staffId }),
		{ id: seeded.id },
	);

	expect(result.errors).toBeUndefined();
	const single = result.data?.item as {
		createdBy: { id: string; email: string };
	};
	expect(single.createdBy.id).toBe(staffId);
});

test("createdBy stays gated through the items list too", async () => {
	await seedItem();
	const customerId = await seedUser("CUSTOMER");

	const result = await runOperation(
		`query { items { select { id createdBy { id } } } }`,
		testContext(db, { userId: customerId }),
	);

	// The gate is field-level on Item, so the list path is denied all the same.
	expect(result.errors?.[0]?.message).toMatch(/not authorized/i);
});
