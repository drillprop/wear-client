import { builder } from "../builder.js";
import { SortOrderEnum } from "../shared/sort-order.js";
import { CategoryEnum, GenderEnum } from "./enums.js";

/**
 * `SearchItemInput` — the full filter/sort/pagination surface for the `items`
 * query, matching the legacy `where` contract the web app sends. Every field is
 * optional; an empty input returns the whole catalogue. `sortBy` is a free
 * string mapped to a whitelisted column server-side (see `filters.ts`), so an
 * unknown value falls back to a safe default rather than reaching the database.
 */
export const SearchItemInput = builder.inputType("SearchItemInput", {
	fields: (t) => ({
		id: t.id({ required: false }),
		take: t.int({ required: false }),
		skip: t.int({ required: false }),
		sortBy: t.string({ required: false }),
		sortOrder: t.field({ type: SortOrderEnum, required: false }),
		priceFrom: t.float({ required: false }),
		priceTo: t.float({ required: false }),
		name: t.string({ required: false }),
		category: t.field({ type: CategoryEnum, required: false }),
		gender: t.field({ type: GenderEnum, required: false }),
		available: t.boolean({ required: false }),
	}),
});
