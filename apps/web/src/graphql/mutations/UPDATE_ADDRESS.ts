import { graphql } from "@/gql";

/** `UpdateAddress` — the signed-in customer's shipping address. */
export const updateAddress = graphql(`
	mutation UpdateAddress(
		$addressLine1: String
		$addressLine2: String
		$zipCode: String
		$city: String
		$country: String
	) {
		updateAddress(
			input: {
				addressLine1: $addressLine1
				addressLine2: $addressLine2
				zipCode: $zipCode
				city: $city
				country: $country
			}
		) {
			message
		}
	}
`);
