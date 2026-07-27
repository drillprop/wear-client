import { graphql } from "@/gql";

/**
 * `Users` — staff user directory. Rewritten to the rebuilt API (#44):
 * `SearchUserInput` dropped `id`/`sortBy`/`sortOrder`, and `User` dropped
 * `createdOrders`.
 */
export const users = graphql(`
	query Users(
		$take: Int
		$skip: Int
		$role: UserRole
		$email: String
		$firstName: String
		$lastName: String
	) {
		users(
			where: {
				take: $take
				skip: $skip
				role: $role
				email: $email
				firstName: $firstName
				lastName: $lastName
			}
		) {
			count
			select {
				id
				email
				firstName
				lastName
				phoneNumber
				role
			}
		}
	}
`);
