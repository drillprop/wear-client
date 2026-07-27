import { graphql } from "@/gql";

/**
 * The current-user query, used by the App Router auth reverse gate, the
 * `(account)` server layout, and the account forms. Rewritten to the rebuilt
 * API (#44): the dropped `resetToken`/`resetTokenExpiry` fields are gone.
 */
export const me = graphql(`
	query Me {
		me {
			id
			email
			firstName
			lastName
			phoneNumber
			role
			createdAt
			updatedAt
			newsletter
			address {
				addressLine1
				addressLine2
				zipCode
				city
				country
			}
		}
	}
`);
