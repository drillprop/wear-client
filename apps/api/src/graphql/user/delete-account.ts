import { eq } from "drizzle-orm";
import { GraphQLError } from "graphql";
import { verifyPassword } from "../../auth/password.js";
import { user } from "../../db/schema.js";
import { builder } from "../builder.js";
import { requireUserId } from "../shared/require-user.js";
import { SuccessMessageRef } from "../shared/success-message.js";

/**
 * `deleteAccount` — a customer permanently removes their own account. Re-verifies
 * the current password first (this is a destructive, irreversible action, so a
 * live session alone shouldn't authorize it), then deletes the row — the FK
 * cascade takes the address with it — and clears the session cookie.
 */
builder.mutationField("deleteAccount", (t) =>
	t.field({
		type: SuccessMessageRef,
		nullable: false,
		authScopes: { loggedIn: true },
		args: {
			password: t.arg.string({ required: true }),
		},
		resolve: async (_root, { password }, ctx) => {
			const userId = requireUserId(ctx);

			const [found] = await ctx.db
				.select({ password: user.password })
				.from(user)
				.where(eq(user.id, userId))
				.limit(1);
			if (!found || !(await verifyPassword(password, found.password))) {
				throw new GraphQLError("Incorrect password");
			}

			await ctx.db.delete(user).where(eq(user.id, userId));
			ctx.clearSession();
			return { message: "Account deleted" };
		},
	}),
);
