import { graphql } from "@/gql";

/**
 * `SingleUser` — one user for the staff admin. Rewritten to the rebuilt API
 * (#44): `User` dropped `createdOrders`.
 */
export const singleUser = graphql(`
	query SingleUser($id: ID!) {
		user(id: $id) {
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
