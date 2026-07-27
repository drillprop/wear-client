import { eq } from "drizzle-orm";
import { GraphQLError } from "graphql";
import { hashPassword } from "../../auth/password.js";
import { user } from "../../db/schema.js";
import { builder } from "../builder.js";
import { SuccessMessageRef } from "../shared/success-message.js";
import { ChangePasswordInput } from "./inputs.js";

/**
 * `changePassword` — consume a reset token (#49). Looks the token up, rejects it
 * if it matches no user or has expired (one generic error for both, so it leaks
 * nothing about which tokens exist), then re-hashes the new password and clears
 * the token so it can't be replayed.
 */
builder.mutationField("changePassword", (t) =>
	t.field({
		type: SuccessMessageRef,
		nullable: false,
		args: {
			input: t.arg({ type: ChangePasswordInput, required: true }),
		},
		resolve: async (_root, { input }, ctx) => {
			const [found] = await ctx.db
				.select({ id: user.id, resetTokenExpiry: user.resetTokenExpiry })
				.from(user)
				.where(eq(user.resetToken, input.token))
				.limit(1);
			if (
				!found?.resetTokenExpiry ||
				found.resetTokenExpiry.getTime() < Date.now()
			) {
				throw new GraphQLError("Invalid or expired reset token");
			}

			const password = await hashPassword(input.password);
			await ctx.db
				.update(user)
				.set({ password, resetToken: null, resetTokenExpiry: null })
				.where(eq(user.id, found.id));

			return { message: "Password updated" };
		},
	}),
);
