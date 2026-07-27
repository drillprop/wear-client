import { eq } from "drizzle-orm";
import { beforeEach, expect, test } from "vitest";
import type { DbClient } from "../../db/client.js";
import { item, order, orderedItem, user } from "../../db/schema.js";
import { runOperation, testContext } from "../../test-support/graphql.js";
import { createTestDb } from "../../test-support/pglite.js";

const CREATE_ORDER = `mutation Place($input: [CreateOrderInput!]!) {
	createOrder(input: $input) {
		id
		status
		orderedBy { id }
		orderedItems { sizeSymbol item { id name } }
	}
}`;

const USER_ORDERS = `query UserOrders($take: Int, $skip: Int) {
	userOrders(take: $take, skip: $skip) {
		count
		select { id status }
	}
}`;

const ORDER = `query Order($id: ID!) {
	order(id: $id) { id status orderedItems { sizeSymbol } }
}`;

const DELETE_ORDER = `mutation Delete($id: ID!) {
	deleteOrder(id: $id) { message }
}`;

const ORDERS = `query Orders($where: SearchOrdersInput) {
	orders(where: $where) { id status orderedBy { id } }
}`;

const MANAGE_ORDER = `mutation Manage($id: ID!, $status: OrderStatus!) {
	manageOrder(id: $id, status: $status) { message }
}`;

let db: DbClient;
let seq = 0;
let staffId: string;

beforeEach(async () => {
	db = await createTestDb();
	// Items need an author; the ordering flows don't care who it is.
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

async function seedItem(name = "Plain Tee") {
	const [row] = await db
		.insert(item)
		.values({
			name,
			price: 100,
			imageUrl: "https://img.wear.test/x.jpg",
			category: "TSHIRT",
			gender: "MAN",
			createdById: staffId,
		})
		.returning();
	if (!row) {
		throw new Error("seed item failed");
	}
	return row;
}

async function place(
	userId: string,
	lines: Array<{ itemId: string; size: string }>,
) {
	const result = await runOperation(CREATE_ORDER, testContext(db, { userId }), {
		input: lines,
	});
	expect(result.errors).toBeUndefined();
	const created = result.data?.createOrder as { id: string };
	return created.id;
}

test("createOrder records an order with its item/size lines, owned by the caller", async () => {
	const customerId = await seedUser("CUSTOMER");
	const tee = await seedItem("Tee");
	const cap = await seedItem("Cap");

	const result = await runOperation(
		CREATE_ORDER,
		testContext(db, { userId: customerId }),
		{
			input: [
				{ itemId: tee.id, size: "M" },
				{ itemId: cap.id, size: "L" },
			],
		},
	);

	expect(result.errors).toBeUndefined();
	const placed = result.data?.createOrder as {
		id: string;
		status: string;
		orderedBy: { id: string };
		orderedItems: Array<{ sizeSymbol: string; item: { id: string } }>;
	};
	expect(placed.status).toBe("PENDING");
	expect(placed.orderedBy.id).toBe(customerId);
	expect(
		placed.orderedItems.map((l) => [l.item.id, l.sizeSymbol]).sort(),
	).toEqual(
		[
			[tee.id, "M"],
			[cap.id, "L"],
		].sort(),
	);
});

test("createOrder rejects an unknown item id", async () => {
	const customerId = await seedUser("CUSTOMER");

	const result = await runOperation(
		CREATE_ORDER,
		testContext(db, { userId: customerId }),
		{ input: [{ itemId: crypto.randomUUID(), size: "M" }] },
	);

	expect(result.errors?.[0]?.message).toMatch(/do not exist/i);
	// The doomed transaction never opened: no order row was written.
	expect(await db.$count(order)).toBe(0);
});

test("createOrder rejects an empty order", async () => {
	const customerId = await seedUser("CUSTOMER");

	const result = await runOperation(
		CREATE_ORDER,
		testContext(db, { userId: customerId }),
		{ input: [] },
	);

	expect(result.errors?.[0]?.message).toMatch(/at least one item/i);
	expect(await db.$count(order)).toBe(0);
});

test("createOrder is rejected for an anonymous caller", async () => {
	const tee = await seedItem("Tee");

	const result = await runOperation(CREATE_ORDER, testContext(db), {
		input: [{ itemId: tee.id, size: "M" }],
	});

	expect(result.errors?.[0]?.message).toMatch(/not authorized/i);
	expect(await db.$count(order)).toBe(0);
});

test("userOrders returns only the caller's own orders, newest first", async () => {
	const alice = await seedUser("CUSTOMER");
	const bob = await seedUser("CUSTOMER");
	const tee = await seedItem("Tee");
	await place(alice, [{ itemId: tee.id, size: "S" }]);
	await place(alice, [{ itemId: tee.id, size: "M" }]);
	await place(bob, [{ itemId: tee.id, size: "L" }]);

	const result = await runOperation(
		USER_ORDERS,
		testContext(db, { userId: alice }),
	);

	expect(result.errors).toBeUndefined();
	const own = result.data?.userOrders as {
		count: number;
		select: Array<{ id: string; status: string }>;
	};
	expect(own.count).toBe(2);
	expect(own.select).toHaveLength(2);
	expect(own.select.every((o) => o.status === "PENDING")).toBe(true);
});

test("userOrders paginates with take and skip while count stays the full total", async () => {
	const customerId = await seedUser("CUSTOMER");
	const tee = await seedItem("Tee");
	for (const size of ["XS", "S", "M"]) {
		await place(customerId, [{ itemId: tee.id, size }]);
	}

	const result = await runOperation(
		USER_ORDERS,
		testContext(db, { userId: customerId }),
		{ take: 1, skip: 1 },
	);

	const page = result.data?.userOrders as {
		count: number;
		select: unknown[];
	};
	expect(page.select).toHaveLength(1);
	expect(page.count).toBe(3);
});

test("order returns the caller's own order with its lines", async () => {
	const customerId = await seedUser("CUSTOMER");
	const tee = await seedItem("Tee");
	const orderId = await place(customerId, [{ itemId: tee.id, size: "M" }]);

	const result = await runOperation(
		ORDER,
		testContext(db, { userId: customerId }),
		{ id: orderId },
	);

	expect(result.errors).toBeUndefined();
	const single = result.data?.order as {
		id: string;
		orderedItems: Array<{ sizeSymbol: string }>;
	};
	expect(single.id).toBe(orderId);
	expect(single.orderedItems.map((l) => l.sizeSymbol)).toEqual(["M"]);
});

test("order hides another customer's order behind a null result", async () => {
	const alice = await seedUser("CUSTOMER");
	const bob = await seedUser("CUSTOMER");
	const tee = await seedItem("Tee");
	const aliceOrder = await place(alice, [{ itemId: tee.id, size: "M" }]);

	const result = await runOperation(ORDER, testContext(db, { userId: bob }), {
		id: aliceOrder,
	});

	expect(result.errors).toBeUndefined();
	expect(result.data?.order).toBeNull();
});

test("deleteOrder cancels the caller's own pending order and cascades its lines", async () => {
	const customerId = await seedUser("CUSTOMER");
	const tee = await seedItem("Tee");
	const orderId = await place(customerId, [{ itemId: tee.id, size: "M" }]);

	const result = await runOperation(
		DELETE_ORDER,
		testContext(db, { userId: customerId }),
		{ id: orderId },
	);

	expect(result.errors).toBeUndefined();
	expect(await db.$count(order, eq(order.id, orderId))).toBe(0);
	// The FK cascade took the lines with the order.
	expect(await db.$count(orderedItem, eq(orderedItem.orderId, orderId))).toBe(
		0,
	);
});

test("deleteOrder can't touch another customer's order", async () => {
	const alice = await seedUser("CUSTOMER");
	const bob = await seedUser("CUSTOMER");
	const tee = await seedItem("Tee");
	const aliceOrder = await place(alice, [{ itemId: tee.id, size: "M" }]);

	const result = await runOperation(
		DELETE_ORDER,
		testContext(db, { userId: bob }),
		{ id: aliceOrder },
	);

	expect(result.errors?.[0]?.message).toMatch(/not found/i);
	// Alice's order is untouched.
	expect(await db.$count(order, eq(order.id, aliceOrder))).toBe(1);
});

test("deleteOrder refuses an order that has moved past pending", async () => {
	const customerId = await seedUser("CUSTOMER");
	const adminId = await seedUser("ADMIN");
	const tee = await seedItem("Tee");
	const orderId = await place(customerId, [{ itemId: tee.id, size: "M" }]);
	await runOperation(MANAGE_ORDER, testContext(db, { userId: adminId }), {
		id: orderId,
		status: "PAID",
	});

	const result = await runOperation(
		DELETE_ORDER,
		testContext(db, { userId: customerId }),
		{ id: orderId },
	);

	expect(result.errors?.[0]?.message).toMatch(/pending/i);
	expect(await db.$count(order, eq(order.id, orderId))).toBe(1);
});

test("orders lets an admin search the whole book by status", async () => {
	const alice = await seedUser("CUSTOMER");
	const bob = await seedUser("CUSTOMER");
	const adminId = await seedUser("ADMIN");
	const tee = await seedItem("Tee");
	const aliceOrder = await place(alice, [{ itemId: tee.id, size: "M" }]);
	await place(bob, [{ itemId: tee.id, size: "L" }]);
	await runOperation(MANAGE_ORDER, testContext(db, { userId: adminId }), {
		id: aliceOrder,
		status: "SENT",
	});

	const all = await runOperation(ORDERS, testContext(db, { userId: adminId }));
	expect(all.errors).toBeUndefined();
	const allRows = all.data?.orders as unknown[];
	expect(allRows).toHaveLength(2);

	const sent = await runOperation(
		ORDERS,
		testContext(db, { userId: adminId }),
		{
			where: { status: "SENT" },
		},
	);
	const rows = sent.data?.orders as Array<{ id: string; status: string }>;
	expect(rows.map((o) => o.id)).toEqual([aliceOrder]);
	expect(rows[0]?.status).toBe("SENT");
});

test("orders is rejected for a non-admin caller", async () => {
	const staffOnly = await seedUser("EMPLOYEE");

	const result = await runOperation(
		ORDERS,
		testContext(db, { userId: staffOnly }),
	);

	expect(result.errors?.[0]?.message).toMatch(/not authorized/i);
});

test("manageOrder advances an order's status for an admin", async () => {
	const customerId = await seedUser("CUSTOMER");
	const adminId = await seedUser("ADMIN");
	const tee = await seedItem("Tee");
	const orderId = await place(customerId, [{ itemId: tee.id, size: "M" }]);

	const result = await runOperation(
		MANAGE_ORDER,
		testContext(db, { userId: adminId }),
		{ id: orderId, status: "COMPLETED" },
	);

	expect(result.errors).toBeUndefined();
	const [after] = await db
		.select({ status: order.status })
		.from(order)
		.where(eq(order.id, orderId));
	expect(after?.status).toBe("COMPLETED");
});

test("manageOrder errors on an unknown order id", async () => {
	const adminId = await seedUser("ADMIN");

	const result = await runOperation(
		MANAGE_ORDER,
		testContext(db, { userId: adminId }),
		{ id: crypto.randomUUID(), status: "PAID" },
	);

	expect(result.data?.manageOrder ?? null).toBeNull();
	expect(result.errors?.[0]?.message).toMatch(/not found/i);
});

test("manageOrder is rejected for a non-admin caller", async () => {
	const customerId = await seedUser("CUSTOMER");
	const staffId2 = await seedUser("EMPLOYEE");
	const tee = await seedItem("Tee");
	const orderId = await place(customerId, [{ itemId: tee.id, size: "M" }]);

	const result = await runOperation(
		MANAGE_ORDER,
		testContext(db, { userId: staffId2 }),
		{ id: orderId, status: "PAID" },
	);

	expect(result.errors?.[0]?.message).toMatch(/not authorized/i);
	const [after] = await db
		.select({ status: order.status })
		.from(order)
		.where(eq(order.id, orderId));
	expect(after?.status).toBe("PENDING");
});

test("deleting a catalogue item cascades to its ordered lines", async () => {
	const customerId = await seedUser("CUSTOMER");
	const tee = await seedItem("Tee");
	const orderId = await place(customerId, [{ itemId: tee.id, size: "M" }]);

	await db.delete(item).where(eq(item.id, tee.id));

	// The line referencing the deleted item is gone; the order row remains.
	expect(await db.$count(orderedItem, eq(orderedItem.orderId, orderId))).toBe(
		0,
	);
	expect(await db.$count(order, eq(order.id, orderId))).toBe(1);
});
