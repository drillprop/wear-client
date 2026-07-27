import { graphql } from "@/gql";

/** `UpdateItem` — staff catalogue edit (EditItemInput; gender is immutable). */
export const updateItem = graphql(`
	mutation UpdateItem(
		$id: String!
		$name: String
		$price: Float
		$imageUrl: String
		$category: Category
		$sizes: [ItemSizesInput!]
	) {
		updateItem(
			input: {
				id: $id
				name: $name
				price: $price
				imageUrl: $imageUrl
				category: $category
				sizes: $sizes
			}
		) {
			id
			name
			price
			imageUrl
			category
			gender
			createdAt
			sizes {
				sizeSymbol
				quantity
			}
		}
	}
`);
