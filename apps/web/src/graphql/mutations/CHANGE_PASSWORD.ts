import { graphql } from "@/gql";

/**
 * `ChangePassword` — completes a password reset with the emailed token and a new
 * password. Rewritten to the rebuilt API (#44): the schema now takes
 * `input: { password, token }` (the old client sent `password/newPassword/confirmPassword`).
 */
export const changePassword = graphql(`
	mutation ChangePassword($password: String!, $token: String!) {
		changePassword(input: { password: $password, token: $token }) {
			message
		}
	}
`);
