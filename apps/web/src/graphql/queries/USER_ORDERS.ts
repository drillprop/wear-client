import { graphql } from "@/gql";

/** `UserOrders` — the signed-in customer's orders (server-scoped to them). */
export const userOrders = graphql(`
	query UserOrders($take: Int, $skip: Int) {
		userOrders(take: $take, skip: $skip) {
			count
			select {
				id
				createdAt
				status
				orderedItems {
					id
					sizeSymbol
					item {
						gender
						id
						name
						price
					}
				}
			}
		}
	}
`);
