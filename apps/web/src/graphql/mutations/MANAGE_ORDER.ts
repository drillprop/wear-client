import { graphql } from "@/gql";

/** `ManageOrder` — staff advances an order's status. */
export const manageOrder = graphql(`
	mutation ManageOrder($id: ID!, $status: OrderStatus!) {
		manageOrder(id: $id, status: $status) {
			message
		}
	}
`);
