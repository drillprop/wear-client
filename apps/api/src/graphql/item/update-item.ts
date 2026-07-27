import { eq, sql } from "drizzle-orm";
import { GraphQLError } from "graphql";
import { item, size } from "../../db/schema.js";
import { builder } from "../builder.js";
import { EditItemInput } from "./inputs.js";
import { ItemRef } from "./item.type.js";
import { assertNameAvailable, priceToInt } from "./write-support.js";

/**
 * `updateItem` (staff) — edit an item's scalar fields and/or its sizes. Only the
 * fields present in the input are written; omitted ones are left as-is. A rename
 * is held to the same uniqueness rule as create (#38). Sizes are upserted by the
 * `(size_symbol, item)` unique key — an existing symbol has its quantity updated,
 * a new one is inserted — so the web app can send its full size set on every save
 * without wiping untouched rows. The field update and size upsert run in one
 * transaction; the `drizzleField` re-reads the item so the response resolves
 * nested sizes in one query.
 */
builder.mutationField("updateItem", (t) =>
	t.drizzleField({
		type: ItemRef,
		nullable: false,
		authScopes: { staff: true },
		args: {
			input: t.arg({ type: EditItemInput, required: true }),
		},
		resolve: async (query, _root, { input }, ctx) => {
			const [existing] = await ctx.db
				.select({ id: item.id })
				.from(item)
				.where(eq(item.id, input.id))
				.limit(1);
			if (!existing) {
				throw new GraphQLError("Item not found");
			}

			if (input.name != null) {
				await assertNameAvailable(ctx.db, input.name, input.id);
			}

			const fields: Partial<typeof item.$inferInsert> = {};
			if (input.name != null) {
				fields.name = input.name;
			}
			if (input.price != null) {
				fields.price = priceToInt(input.price);
			}
			if (input.imageUrl != null) {
				fields.imageUrl = input.imageUrl;
			}
			if (input.category != null) {
				fields.category = input.category;
			}

			await ctx.db.transaction(async (tx) => {
				if (Object.keys(fields).length > 0) {
					await tx.update(item).set(fields).where(eq(item.id, input.id));
				}

				if (input.sizes?.length) {
					await tx
						.insert(size)
						.values(
							input.sizes.map((s) => ({
								itemId: input.id,
								sizeSymbol: s.sizeSymbol,
								quantity: s.quantity,
							})),
						)
						.onConflictDoUpdate({
							target: [size.sizeSymbol, size.itemId],
							set: { quantity: sql`excluded.quantity` },
						});
				}
			});

			const loaded = await ctx.db.query.item.findFirst(
				query({ where: { id: input.id } }),
			);
			if (!loaded) {
				throw new GraphQLError("Failed to load updated item");
			}
			return loaded;
		},
	}),
);
