import { graphql } from "@/gql";

/** `Signout` — clears the session cookie (Set-Cookie flows back through the proxy). */
export const signout = graphql(`
	mutation Signout {
		signout {
			message
		}
	}
`);
