import { builder } from "../builder.js";

/**
 * The catalogue enums, each mirroring its `pgEnum` in the Drizzle schema so the
 * GraphQL values map straight onto the stored column values (#47).
 */

/** `Gender` an item is filed under. */
export const GenderEnum = builder.enumType("Gender", {
	values: ["MAN", "WOMAN"] as const,
});

/** `Category` — the eight garment types the shop sorts items into. */
export const CategoryEnum = builder.enumType("Category", {
	values: [
		"TROUSERS",
		"DRESS",
		"BLOUSE",
		"TSHIRT",
		"SHIRT",
		"JACKET",
		"BLAZER",
		"SWEATSHIRT",
	] as const,
});

/** `SizeSymbol` — an item's stock-keeping sizes. */
export const SizeSymbolEnum = builder.enumType("SizeSymbol", {
	values: ["XS", "S", "M", "L", "XL", "XXL"] as const,
});
