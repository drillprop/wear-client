import { max } from "drizzle-orm";
import { item } from "../../db/schema.js";
import { builder } from "../builder.js";
import {
	type ItemFilter,
	itemOrderBy,
	itemRqbWhere,
	itemWhere,
	normalizeFilter,
} from "./filters.js";
import { SearchItemInput } from "./inputs.js";
import { ItemRef } from "./item.type.js";

/**
 * `ItemsAndCount` — the search result envelope: the matching `select` page, the
 * total `count` behind it (for pagination), and `maxPrice` (the catalogue's top
 * price, for the price-range slider). The parent value is the resolved
 * `ItemFilter`, and each field rebuilds its own query from it so a caller pays
 * only for the fields it selects.
 */
const ItemsAndCount = builder.objectRef<ItemFilter>("ItemsAndCount");

ItemsAndCount.implement({
	fields: (t) => ({
		// The plugin's `query` merges the nested selection (sizes / createdBy) with
		// our filter, so the page and its relations load in one round-trip.
		select: t.drizzleField({
			type: [ItemRef],
			resolve: (query, spec, _args, ctx) =>
				ctx.db.query.item.findMany(
					query({
						where: itemRqbWhere(spec),
						orderBy: itemOrderBy(spec),
						limit: spec.take ?? undefined,
						offset: spec.skip ?? undefined,
					}),
				),
		}),
		count: t.int({
			nullable: false,
			resolve: (spec, _args, ctx) =>
				ctx.db.$count(item, itemWhere(spec, ctx.db, { withPrice: true })),
		}),
		// maxPrice ignores the price range (see itemWhere) so it stays the slider's
		// stable upper bound as the customer narrows the range.
		maxPrice: t.float({
			nullable: true,
			resolve: async (spec, _args, ctx) => {
				const [row] = await ctx.db
					.select({ max: max(item.price) })
					.from(item)
					.where(itemWhere(spec, ctx.db, { withPrice: false }));
				return row?.max ?? null;
			},
		}),
	}),
});

/**
 * `items` — the catalogue search. The resolver only normalizes the filter; the
 * actual queries run lazily in the `ItemsAndCount` fields above.
 */
builder.queryField("items", (t) =>
	t.field({
		type: ItemsAndCount,
		nullable: false,
		args: {
			where: t.arg({ type: SearchItemInput, required: false }),
		},
		resolve: (_root, { where }) => normalizeFilter(where),
	}),
);
