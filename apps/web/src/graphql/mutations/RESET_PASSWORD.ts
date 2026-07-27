import { graphql } from "@/gql";

/**
 * `ResetPassword` — requests a password-reset email for the address. Rewritten
 * to the rebuilt API (#44): the old client called `requestResetPassword(email:)`,
 * the schema now exposes `resetPassword(input: { email })`.
 */
export const resetPassword = graphql(`
	mutation ResetPassword($email: String!) {
		resetPassword(input: { email: $email }) {
			message
		}
	}
`);
