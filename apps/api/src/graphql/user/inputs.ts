import { builder } from "../builder.js";

/**
 * `register` and `login` take the same credentials under the same rules, so the
 * validation lives in one place and the two inputs can't drift apart. A
 * well-formed email (≤255 chars) and a 6–255 char password, matching the legacy
 * class-validator constraints; validation runs through the zod plugin before the
 * resolver. Email *uniqueness* isn't expressible here (it needs a DB lookup), so
 * the `register` resolver enforces it explicitly (#38), backed by a DB constraint.
 */
const emailValidation = { email: true, maxLength: 255 };
const passwordValidation = { minLength: 6, maxLength: 255 };

export const RegisterInput = builder.inputType("RegisterInput", {
	fields: (t) => ({
		email: t.string({ required: true, validate: emailValidation }),
		password: t.string({ required: true, validate: passwordValidation }),
	}),
});

export const LoginInput = builder.inputType("LoginInput", {
	fields: (t) => ({
		email: t.string({ required: true, validate: emailValidation }),
		password: t.string({ required: true, validate: passwordValidation }),
	}),
});

/**
 * `resetPassword` takes just the account email under the same well-formed-email
 * rule; the resolver looks the user up and issues a token (#49).
 */
export const ResetPasswordInput = builder.inputType("ResetPasswordInput", {
	fields: (t) => ({
		email: t.string({ required: true, validate: emailValidation }),
	}),
});

/**
 * `changePassword` consumes a reset token and sets a new password. The token is
 * an opaque server-issued string (no format rule to assert here); the password
 * reuses the same 6–255 char rule registration and login enforce.
 */
export const ChangePasswordInput = builder.inputType("ChangePasswordInput", {
	fields: (t) => ({
		token: t.string({ required: true }),
		password: t.string({ required: true, validate: passwordValidation }),
	}),
});
