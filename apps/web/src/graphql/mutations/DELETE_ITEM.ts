import { graphql } from "@/gql";

/** `DeleteItem` — staff catalogue delete. */
export const deleteItem = graphql(`
	mutation DeleteItem($id: ID!) {
		deleteItem(id: $id) {
			message
		}
	}
`);
