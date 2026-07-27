import { graphql } from "@/gql";

/** `Orders` — staff order list (all customers' orders, searchable/paginated). */
export const orders = graphql(`
	query Orders($take: Int, $skip: Int, $status: OrderStatus) {
		orders(where: { take: $take, skip: $skip, status: $status }) {
			id
			createdAt
			status
			orderedBy {
				id
				email
			}
			orderedItems {
				id
				sizeSymbol
				item {
					id
					name
					price
				}
			}
		}
	}
`);
