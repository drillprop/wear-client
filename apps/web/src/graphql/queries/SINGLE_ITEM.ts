import { graphql } from "@/gql";

/**
 * The `SingleItem` query — one catalogue item with its sizes. Consumed by the
 * App Router shop-item slice (RSC `PreloadQuery` + client leaf). Authored as a
 * client-preset `graphql()` document (#36 story 21).
 */
export const singleItem = graphql(`
	query SingleItem($id: ID!) {
		item(id: $id) {
			id
			name
			description
			price
			imageUrl
			category
			gender
			createdAt
			updatedAt
			sizes {
				sizeSymbol
				quantity
			}
		}
	}
`);
