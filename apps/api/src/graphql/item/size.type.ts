import { builder } from "../builder.js";
import { SizeSymbolEnum } from "./enums.js";

/**
 * The `Size` GraphQL type, derived from the `size` Drizzle table — an item's
 * stock for one `SizeSymbol`. Both fields are non-null: a stored size row always
 * carries a symbol and a quantity (defaulting to 0).
 */
export const SizeRef = builder.drizzleObject("size", {
	name: "Size",
	fields: (t) => ({
		sizeSymbol: t.field({
			type: SizeSymbolEnum,
			nullable: false,
			resolve: (s) => s.sizeSymbol,
		}),
		quantity: t.exposeInt("quantity", { nullable: false }),
	}),
});
