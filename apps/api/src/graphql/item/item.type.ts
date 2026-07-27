import { builder } from "../builder.js";
import { CategoryEnum, GenderEnum } from "./enums.js";

/**
 * The `Item` GraphQL type, derived from the `item` Drizzle table. `price` is
 * stored as an `integer` but exposed as `Float` to keep the legacy contract;
 * `category`/`gender` are custom fields (the plugin can't `expose` an enum).
 *
 * `createdBy` is gated to the `staff` scope (#46) — a customer who selects it
 * gets an authorization error, so the authoring staff member stays hidden from
 * the shop while remaining available to staff tooling. `sizes` loads through the
 * plugin's relation seam, so both the `item` query and the `items` list resolve
 * it in a single query per request.
 */
export const ItemRef = builder.drizzleObject("item", {
	name: "Item",
	fields: (t) => ({
		id: t.exposeID("id", { nullable: false }),
		name: t.exposeString("name", { nullable: false }),
		description: t.exposeString("description", { nullable: true }),
		price: t.field({
			type: "Float",
			nullable: false,
			resolve: (i) => i.price,
		}),
		imageUrl: t.exposeString("imageUrl", { nullable: false }),
		category: t.field({
			type: CategoryEnum,
			nullable: false,
			resolve: (i) => i.category,
		}),
		gender: t.field({
			type: GenderEnum,
			nullable: false,
			resolve: (i) => i.gender,
		}),
		sizes: t.relation("sizes"),
		createdBy: t.relation("createdBy", {
			authScopes: { staff: true },
		}),
		createdAt: t.field({
			type: "DateTime",
			nullable: false,
			resolve: (i) => i.createdAt,
		}),
		updatedAt: t.field({
			type: "DateTime",
			nullable: false,
			resolve: (i) => i.updatedAt,
		}),
	}),
});
