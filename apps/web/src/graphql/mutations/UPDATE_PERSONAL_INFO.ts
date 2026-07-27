import { graphql } from "@/gql";

/** `UpdatePersonalInfo` — the signed-in customer's name / phone. */
export const updatePersonalInfo = graphql(`
	mutation UpdatePersonalInfo(
		$firstName: String
		$lastName: String
		$phoneNumber: String
	) {
		updatePersonalInfo(
			input: {
				firstName: $firstName
				lastName: $lastName
				phoneNumber: $phoneNumber
			}
		) {
			message
		}
	}
`);
