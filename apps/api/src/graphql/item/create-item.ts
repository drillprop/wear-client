import { GraphQLError } from "graphql";
import { item, size } from "../../db/schema.js";
import { builder } from "../builder.js";
import { CreateItemInput } from "./inputs.js";
import { ItemRef } from "./item.type.js";
import { assertNameAvailable, priceToInt } from "./write-support.js";

/**
 * `createItem` (staff) — stock a new catalogue item and its sizes. Name
 * uniqueness is enforced with a lookup the input validator can't do (#38); the
 * authenticated staff member is recorded as `createdBy`. The item and its sizes
 * are written in one transaction, so a failed size insert can't leave an item
 * orphaned without stock. The `drizzleField` re-reads the item afterwards so the
 * response's nested selection (sizes, createdBy) resolves in a single query.
 */
builder.mutationField("createItem", (t) =>
	t.drizzleField({
		type: ItemRef,
		nullable: false,
		authScopes: { staff: true },
		args: {
			input: t.arg({ type: CreateItemInput, required: true }),
		},
		resolve: async (query, _root, { input }, ctx) => {
			// The staff scope guarantees an authenticated user; capture it for the
			// non-null `createdBy` column and to satisfy the type across the closure.
			const userId = ctx.userId;
			if (!userId) {
				throw new GraphQLError("Not authenticated");
			}

			await assertNameAvailable(ctx.db, input.name);

			const created = await ctx.db.transaction(async (tx) => {
				const [row] = await tx
					.insert(item)
					.values({
						name: input.name,
						price: priceToInt(input.price),
						imageUrl: input.imageUrl,
						category: input.category,
						gender: input.gender,
						description: input.description ?? null,
						createdById: userId,
					})
					.returning({ id: item.id });
				if (!row) {
					throw new GraphQLError("Failed to create item");
				}

				if (input.sizes?.length) {
					await tx.insert(size).values(
						input.sizes.map((s) => ({
							itemId: row.id,
							sizeSymbol: s.sizeSymbol,
							quantity: s.quantity,
						})),
					);
				}
				return row;
			});

			const loaded = await ctx.db.query.item.findFirst(
				query({ where: { id: created.id } }),
			);
			if (!loaded) {
				throw new GraphQLError("Failed to load created item");
			}
			return loaded;
		},
	}),
);
