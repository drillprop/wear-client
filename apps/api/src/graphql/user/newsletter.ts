import { eq } from "drizzle-orm";
import { user } from "../../db/schema.js";
import { builder } from "../builder.js";
import { requireUserId } from "../shared/require-user.js";
import { SuccessMessageRef } from "../shared/success-message.js";

/**
 * `subscribeToNewsletter` — set (or clear) the context user's newsletter flag.
 * Takes an explicit boolean so the one mutation serves both subscribe and
 * unsubscribe. Gated to `loggedIn` and scoped to the caller's own row.
 */
builder.mutationField("subscribeToNewsletter", (t) =>
	t.field({
		type: SuccessMessageRef,
		nullable: false,
		authScopes: { loggedIn: true },
		args: {
			newsletter: t.arg.boolean({ required: true }),
		},
		resolve: async (_root, { newsletter }, ctx) => {
			const userId = requireUserId(ctx);
			await ctx.db.update(user).set({ newsletter }).where(eq(user.id, userId));
			return {
				message: newsletter
					? "Subscribed to the newsletter"
					: "Unsubscribed from the newsletter",
			};
		},
	}),
);
