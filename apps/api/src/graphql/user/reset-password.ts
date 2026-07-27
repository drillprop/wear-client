import { eq } from "drizzle-orm";
import {
	generateResetToken,
	resetTokenExpiryFrom,
} from "../../auth/reset-token.js";
import { user } from "../../db/schema.js";
import { builder } from "../builder.js";
import { SuccessMessageRef } from "../shared/success-message.js";
import { ResetPasswordInput } from "./inputs.js";

/**
 * `resetPassword` — start the recovery flow (#49). When the email belongs to an
 * account, it issues a fresh token with an expiry, persists it, and mails it
 * through the `Mailer` seam (the token is stored before the send so a mail
 * failure can't leave a "sent" token the customer could use). Either way the
 * response is the same generic message: like `login`, the endpoint never reveals
 * whether an email is registered, so it can't be used to enumerate accounts.
 */
builder.mutationField("resetPassword", (t) =>
	t.field({
		type: SuccessMessageRef,
		nullable: false,
		args: {
			input: t.arg({ type: ResetPasswordInput, required: true }),
		},
		resolve: async (_root, { input }, ctx) => {
			const [found] = await ctx.db
				.select({ id: user.id })
				.from(user)
				.where(eq(user.email, input.email))
				.limit(1);

			if (found) {
				const token = generateResetToken();
				await ctx.db
					.update(user)
					.set({ resetToken: token, resetTokenExpiry: resetTokenExpiryFrom() })
					.where(eq(user.id, found.id));

				await ctx.mailer.sendPasswordResetEmail(input.email, token);
			}

			return { message: "If that account exists, a reset email has been sent" };
		},
	}),
);
