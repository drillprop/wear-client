import { graphql } from "@/gql";

/** `Login` — sets the httpOnly session cookie (via the same-origin proxy). */
export const login = graphql(`
	mutation Login($email: String!, $password: String!) {
		login(input: { email: $email, password: $password }) {
			id
			email
			firstName
			lastName
		}
	}
`);
