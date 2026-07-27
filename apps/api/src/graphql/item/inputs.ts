import { builder } from "../builder.js";
import { SortOrderEnum } from "../shared/sort-order.js";
import { CategoryEnum, GenderEnum, SizeSymbolEnum } from "./enums.js";

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

/**
 * One size's stock on a write — the same `{ sizeSymbol, quantity }` pair the web
 * app sends for every symbol it renders (including zero-quantity ones). Reused by
 * both `createItem` and `updateItem`; `quantity` is validated non-negative here so
 * the resolvers never persist a negative count.
 */
export const ItemSizesInput = builder.inputType("ItemSizesInput", {
	fields: (t) => ({
		sizeSymbol: t.field({ type: SizeSymbolEnum, required: true }),
		quantity: t.int({ required: true, validate: { min: 0 } }),
	}),
});

/**
 * `createItem` payload — every catalogue field plus optional nested sizes. `name`
 * uniqueness needs a DB lookup, so it's checked in the resolver (#38), not here;
 * `price` arrives as `Float` to match the legacy contract and the resolver stores
 * it in the `integer` column.
 */
export const CreateItemInput = builder.inputType("CreateItemInput", {
	fields: (t) => ({
		name: t.string({
			required: true,
			validate: { minLength: 1, maxLength: 255 },
		}),
		price: t.float({ required: true, validate: { min: 0 } }),
		imageUrl: t.string({ required: true, validate: { minLength: 1 } }),
		category: t.field({ type: CategoryEnum, required: true }),
		gender: t.field({ type: GenderEnum, required: true }),
		description: t.string({ required: false }),
		sizes: t.field({ type: [ItemSizesInput], required: false }),
	}),
});

/**
 * `updateItem` payload — `id` plus the subset of fields being changed; an omitted
 * field is left untouched. `id` is a `String` (not `ID`) to keep parity with the
 * legacy `EditItemInput` the web app's mutation document still declares. `gender`
 * is intentionally absent — the legacy edit form never changed it. `sizes`, when
 * present, upsert by `(sizeSymbol, item)`.
 */
export const EditItemInput = builder.inputType("EditItemInput", {
	fields: (t) => ({
		id: t.string({ required: true }),
		name: t.string({
			required: false,
			validate: { minLength: 1, maxLength: 255 },
		}),
		price: t.float({ required: false, validate: { min: 0 } }),
		imageUrl: t.string({ required: false, validate: { minLength: 1 } }),
		category: t.field({ type: CategoryEnum, required: false }),
		sizes: t.field({ type: [ItemSizesInput], required: false }),
	}),
});
