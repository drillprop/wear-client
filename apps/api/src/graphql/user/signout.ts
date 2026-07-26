import { builder } from "../builder.js";
import { SuccessMessageRef } from "../shared/success-message.js";

/**
 * `signout` — clear the session cookie. Idempotent: safe to call whether or not
 * a session is active, so it isn't scope-gated.
 */
builder.mutationField("signout", (t) =>
	t.field({
		type: SuccessMessageRef,
		nullable: false,
		resolve: (_root, _args, ctx) => {
			ctx.clearSession();
			return { message: "Successfully signed out" };
		},
	}),
);
