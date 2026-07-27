import { and, eq, ne } from "drizzle-orm";
import { GraphQLError } from "graphql";
import type { DbClient } from "../../db/client.js";
import { item } from "../../db/schema.js";

/**
 * The catalogue contract exposes `price` as `Float`, but the column stores whole
 * currency units as an `integer` (#44). Coerce on the write side so both
 * `createItem` and `updateItem` round identically.
 */
export function priceToInt(price: number): number {
	return Math.round(price);
}

/**
 * Reject a name already carried by another item — the resolver-level uniqueness
 * check that replaces the legacy `IsNameNotTaken` decorator (#38), shared by
 * `createItem` and `updateItem`. `exceptId` excludes the item being updated so
 * re-saving it under its own name is allowed; omit it on create. There is no DB
 * unique constraint on `item.name`, so this lookup is the sole guard.
 */
export async function assertNameAvailable(
	db: DbClient,
	name: string,
	exceptId?: string,
): Promise<void> {
	const where = exceptId
		? and(eq(item.name, name), ne(item.id, exceptId))
		: eq(item.name, name);
	const [clash] = await db
		.select({ id: item.id })
		.from(item)
		.where(where)
		.limit(1);
	if (clash) {
		throw new GraphQLError("Item name already in use");
	}
}
