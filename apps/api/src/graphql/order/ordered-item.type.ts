import { builder } from "../builder.js";
import { SizeSymbolEnum } from "../item/enums.js";

/**
 * The `Ordered_Item` GraphQL type, derived from the `ordered_item` Drizzle table
 * (#51) — one line of an order: the `item` ordered and the `sizeSymbol` the
 * customer chose for it. The underscored type name is the legacy contract's,
 * kept verbatim so the web codegen maps straight through. `item` loads through
 * the plugin's relation seam.
 */
export const OrderedItemRef = builder.drizzleObject("orderedItem", {
	name: "Ordered_Item",
	fields: (t) => ({
		id: t.exposeID("id", { nullable: false }),
		item: t.relation("item"),
		sizeSymbol: t.field({
			type: SizeSymbolEnum,
			nullable: false,
			resolve: (o) => o.sizeSymbol,
		}),
	}),
});
