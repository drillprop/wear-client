import { graphql } from "@/gql";

/** `Register` — creates an account and starts a session (cookie via the proxy). */
export const register = graphql(`
	mutation Register($email: String!, $password: String!) {
		register(input: { email: $email, password: $password }) {
			id
			email
			firstName
			lastName
		}
	}
`);
