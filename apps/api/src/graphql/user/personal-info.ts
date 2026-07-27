import { eq } from "drizzle-orm";
import { user } from "../../db/schema.js";
import { builder } from "../builder.js";
import { definedFields } from "../shared/patch.js";
import { requireUserId } from "../shared/require-user.js";
import { SuccessMessageRef } from "../shared/success-message.js";
import { PersonalInfoInput } from "./inputs.js";

/**
 * `updatePersonalInfo` — a customer edits their own name/phone. Gated to
 * `loggedIn` and written strictly against the context user's id, so a caller can
 * never reach another account. Only fields present in the input are written;
 * omitting one leaves the stored value untouched, letting a partial form save.
 */
builder.mutationField("updatePersonalInfo", (t) =>
	t.field({
		type: SuccessMessageRef,
		nullable: false,
		authScopes: { loggedIn: true },
		args: {
			input: t.arg({ type: PersonalInfoInput, required: true }),
		},
		resolve: async (_root, { input }, ctx) => {
			const userId = requireUserId(ctx);

			const patch = definedFields(input, [
				"firstName",
				"lastName",
				"phoneNumber",
			]);
			if (Object.keys(patch).length > 0) {
				await ctx.db.update(user).set(patch).where(eq(user.id, userId));
			}

			return { message: "Personal info updated" };
		},
	}),
);
