import { graphql } from "@/gql";

/** `DeleteOrder` — staff removes an order. */
export const deleteOrder = graphql(`
	mutation DeleteOrder($id: ID!) {
		deleteOrder(id: $id) {
			message
		}
	}
`);
