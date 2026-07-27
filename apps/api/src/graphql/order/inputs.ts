import { builder } from "../builder.js";
import { SizeSymbolEnum } from "../item/enums.js";
import { SortOrderEnum } from "../shared/sort-order.js";
import { OrderStatusEnum } from "./enums.js";

/**
 * `CreateOrderInput` — one requested line: the `itemId` to order and the `size`
 * symbol chosen for it. `createOrder` takes a list of these (an order is one or
 * more lines), matching the legacy contract where the cart posts an array.
 */
export const CreateOrderInput = builder.inputType("CreateOrderInput", {
	fields: (t) => ({
		itemId: t.id({ required: true }),
		size: t.field({ type: SizeSymbolEnum, required: true }),
	}),
});

/**
 * `SearchOrdersInput` — the admin order-search surface (`orders`): filter by
 * `status` (and `id`), page with `take`/`skip`, and sort. Every field is
 * optional; an empty input returns the whole order book, newest first. `sortBy`
 * is a free string mapped to a whitelisted column server-side, so an unknown
 * value falls back to a safe default rather than reaching the database.
 */
export const SearchOrdersInput = builder.inputType("SearchOrdersInput", {
	fields: (t) => ({
		id: t.id({ required: false }),
		take: t.int({ required: false }),
		skip: t.int({ required: false }),
		sortBy: t.string({ required: false }),
		sortOrder: t.field({ type: SortOrderEnum, required: false }),
		status: t.field({ type: OrderStatusEnum, required: false }),
	}),
});
