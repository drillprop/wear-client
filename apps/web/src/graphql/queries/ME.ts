import { gql } from "@apollo/client-v3";
import { graphql } from "@/gql";

/**
 * The current-user query. Two exports during the migration:
 *
 * - `me` — the client-preset `graphql()` document used by the App Router auth
 *   reverse gate, the `(account)` server layout, and the account forms. Rewritten
 *   to the rebuilt API (#44): the dropped `resetToken`/`resetTokenExpiry` fields
 *   are gone.
 * - default `gql` — kept for the unmigrated Pages Router (header dropdowns, auth
 *   HOCs) that still passes it as a DocumentNode. Ignored by the client-preset
 *   codegen (only the `graphql` tag is extracted), so the two never collide.
 *   Removed at cutover.
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

export default gql`
  query ME {
    me {
      id
      email
      firstName
      lastName
      phoneNumber
      role
      createdAt
      updatedAt
      resetToken
      resetTokenExpiry
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
`;
