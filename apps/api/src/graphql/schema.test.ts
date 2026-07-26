import { execute, parse } from "graphql";
import { expect, test } from "vitest";
import type { Context } from "../context.js";
import { greeting } from "../db/schema.js";
import { createTestDb } from "../test-support/pglite.js";
import { schema } from "./schema.js";

test("greetings query resolves rows from a real Drizzle table through the built schema", async () => {
	const db = await createTestDb();
	await db.insert(greeting).values({ message: "hello, wear" });

	const result = await execute({
		schema,
		document: parse("{ greetings { id message } }"),
		contextValue: { db } satisfies Context,
	});

	expect(result.errors).toBeUndefined();

	const greetings = result.data?.greetings as Array<{
		id: string;
		message: string;
	}>;
	expect(greetings).toHaveLength(1);
	expect(greetings[0]?.message).toBe("hello, wear");
	expect(greetings[0]?.id).toEqual(expect.any(String));
});
