import { eq } from "drizzle-orm";
import { GraphQLError } from "graphql";
import { item } from "../../db/schema.js";
import { builder } from "../builder.js";
import { SuccessMessageRef } from "../shared/success-message.js";

/**
 * `deleteItem` (staff) — remove a catalogue item. The `size` FK cascades on
 * delete, so an item's sizes go with it in one statement (and, once orders land
 * in #51, its ordered-items too). Deleting an unknown id is an error rather than
 * a silent success, so the caller learns the item wasn't there.
 */
builder.mutationField("deleteItem", (t) =>
	t.field({
		type: SuccessMessageRef,
		nullable: false,
		authScopes: { staff: true },
		args: {
			id: t.arg.id({ required: true }),
		},
		resolve: async (_root, { id }, ctx) => {
			const [deleted] = await ctx.db
				.delete(item)
				.where(eq(item.id, id))
				.returning({ id: item.id });
			if (!deleted) {
				throw new GraphQLError("Item not found");
			}
			return { message: "Item deleted" };
		},
	}),
);
