import {
	and,
	eq,
	exists,
	gt,
	gte,
	ilike,
	lte,
	type SQL,
	sql,
} from "drizzle-orm";
import type { DbClient } from "../../db/client.js";
import { type category, type gender, item, size } from "../../db/schema.js";

type Category = (typeof category.enumValues)[number];
type Gender = (typeof gender.enumValues)[number];
type SortOrder = "ASC" | "DESC";

/**
 * The normalized shape of a `SearchItemInput`, carried as the `ItemsAndCount`
 * parent so each field (`select`/`count`/`maxPrice`) can rebuild its own query
 * from the same filter. Every value is nullable — an all-null spec is the whole
 * catalogue.
 */
export interface ItemFilter {
	id: string | null;
	name: string | null;
	category: Category | null;
	gender: Gender | null;
	priceFrom: number | null;
	priceTo: number | null;
	available: boolean | null;
	sortBy: string | null;
	sortOrder: SortOrder | null;
	take: number | null;
	skip: number | null;
}

type ItemFindManyConfig = NonNullable<
	Parameters<DbClient["query"]["item"]["findMany"]>[0]
>;
/** The RQBv2 relational `where` object accepted by `item.findMany`. */
type ItemRqbWhere = NonNullable<ItemFindManyConfig["where"]>;
/** The RQBv2 `orderBy` object accepted by `item.findMany`. */
type ItemRqbOrderBy = NonNullable<ItemFindManyConfig["orderBy"]>;

/** Coerce the optional GraphQL input into a fully-populated filter. */
export function normalizeFilter(
	where: Partial<ItemFilter> | null | undefined,
): ItemFilter {
	return {
		id: where?.id ?? null,
		name: where?.name ?? null,
		category: where?.category ?? null,
		gender: where?.gender ?? null,
		priceFrom: where?.priceFrom ?? null,
		priceTo: where?.priceTo ?? null,
		available: where?.available ?? null,
		sortBy: where?.sortBy ?? null,
		sortOrder: where?.sortOrder ?? null,
		take: where?.take ?? null,
		skip: where?.skip ?? null,
	};
}

/**
 * The relational `where` for the `items` page, in RQBv2 object form so the
 * plugin can merge it with the nested selection and load sizes/createdBy in one
 * query. Every value is a bound parameter (notably `name` via `ilike`), so SQL
 * metacharacters are literal text; `available` compiles to an EXISTS over sizes
 * with `quantity > 0`. This mirrors {@link itemWhere} (used for the aggregates)
 * clause-for-clause — the seam tests keep the two in step.
 */
export function itemRqbWhere(spec: ItemFilter): ItemRqbWhere {
	const where: ItemRqbWhere = {};
	if (spec.id) {
		where.id = spec.id;
	}
	if (spec.name) {
		where.name = { ilike: `%${spec.name}%` };
	}
	if (spec.category) {
		where.category = spec.category;
	}
	if (spec.gender) {
		where.gender = spec.gender;
	}
	if (spec.priceFrom != null || spec.priceTo != null) {
		where.price = {
			...(spec.priceFrom != null ? { gte: spec.priceFrom } : {}),
			...(spec.priceTo != null ? { lte: spec.priceTo } : {}),
		};
	}
	if (spec.available) {
		where.sizes = { quantity: { gt: 0 } };
	}
	return where;
}

/**
 * The parameterised `WHERE` for the search aggregates (`count`, `maxPrice`),
 * built as raw Drizzle SQL for the core query builder. Same clauses as
 * {@link itemRqbWhere}, with `available` as a correlated EXISTS on `size`.
 *
 * `withPrice` toggles the price-range bounds: `count` wants them (it must match
 * the page), but `maxPrice` (the slider's upper bound) must ignore the current
 * price range, or dragging the slider would collapse its own maximum.
 */
export function itemWhere(
	spec: ItemFilter,
	db: DbClient,
	{ withPrice }: { withPrice: boolean },
): SQL | undefined {
	const conditions: (SQL | undefined)[] = [
		spec.id ? eq(item.id, spec.id) : undefined,
		spec.name ? ilike(item.name, `%${spec.name}%`) : undefined,
		spec.category ? eq(item.category, spec.category) : undefined,
		spec.gender ? eq(item.gender, spec.gender) : undefined,
		spec.available
			? exists(
					db
						.select({ present: sql`1` })
						.from(size)
						.where(and(eq(size.itemId, item.id), gt(size.quantity, 0))),
				)
			: undefined,
	];

	if (withPrice) {
		if (spec.priceFrom != null) {
			conditions.push(gte(item.price, spec.priceFrom));
		}
		if (spec.priceTo != null) {
			conditions.push(lte(item.price, spec.priceTo));
		}
	}

	const present = conditions.filter((c): c is SQL => c !== undefined);
	return present.length > 0 ? and(...present) : undefined;
}

/**
 * The columns a search may sort by, keyed by the legacy entity-qualified names
 * the web app sends (`Item.price`, `Item.createdAt`, …) and valued by the
 * Drizzle column name. Whitelisting keeps `sortBy` from naming an arbitrary
 * column — an unknown key falls back to `createdAt`.
 */
const SORT_COLUMNS = {
	"Item.createdAt": "createdAt",
	"Item.updatedAt": "updatedAt",
	"Item.price": "price",
	"Item.name": "name",
} as const;

/** Newest-first is the catalogue's default when no sort is requested. */
export function itemOrderBy(spec: ItemFilter): ItemRqbOrderBy {
	const column =
		SORT_COLUMNS[spec.sortBy as keyof typeof SORT_COLUMNS] ?? "createdAt";
	const direction = spec.sortOrder === "ASC" ? "asc" : "desc";
	switch (column) {
		case "price":
			return { price: direction };
		case "name":
			return { name: direction };
		case "updatedAt":
			return { updatedAt: direction };
		default:
			return { createdAt: direction };
	}
}
