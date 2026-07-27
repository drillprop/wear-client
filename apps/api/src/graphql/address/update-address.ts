import { address } from "../../db/schema.js";
import { builder } from "../builder.js";
import { definedFields } from "../shared/patch.js";
import { requireUserId } from "../shared/require-user.js";
import { SuccessMessageRef } from "../shared/success-message.js";
import { UpdateAddressInput } from "./inputs.js";

/**
 * `updateAddress` — save the context user's single address. Because the address
 * is 1:1 (unique `user_id`), this is an upsert keyed on the caller's id: it
 * creates the row on first save and edits it in place afterwards, so a customer
 * can never accumulate duplicates or touch another user's address. Only fields
 * present in the input are written; omitted ones keep their stored value.
 */
builder.mutationField("updateAddress", (t) =>
	t.field({
		type: SuccessMessageRef,
		nullable: false,
		authScopes: { loggedIn: true },
		args: {
			input: t.arg({ type: UpdateAddressInput, required: true }),
		},
		resolve: async (_root, { input }, ctx) => {
			const userId = requireUserId(ctx);

			const patch = definedFields(input, [
				"addressLine1",
				"addressLine2",
				"zipCode",
				"city",
				"country",
			]);

			const insert = ctx.db.insert(address).values({ userId, ...patch });
			// An empty patch still guarantees a row exists but has nothing to write,
			// so it can't use `onConflictDoUpdate` (which requires a non-empty set).
			await (Object.keys(patch).length > 0
				? insert.onConflictDoUpdate({ target: address.userId, set: patch })
				: insert.onConflictDoNothing());

			return { message: "Address updated" };
		},
	}),
);
