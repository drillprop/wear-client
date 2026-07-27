import { graphql } from "@/gql";

/** `DeleteAccount` — deletes the signed-in customer's account (password-confirmed). */
export const deleteAccount = graphql(`
	mutation DeleteAccount($password: String!) {
		deleteAccount(password: $password) {
			message
		}
	}
`);
