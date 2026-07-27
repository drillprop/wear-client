import { graphql } from "@/gql";

/**
 * The `Items` catalogue query — consumed by the App Router shop slice (RSC
 * `PreloadQuery` + client leaf) and the admin item table. Authored as a
 * client-preset `graphql()` document (#36 story 21).
 */
export const items = graphql(`
	query Items(
		$id: ID
		$take: Int
		$skip: Int
		$sortBy: String
		$sortOrder: SortOrder
		$priceFrom: Float
		$priceTo: Float
		$name: String
		$category: Category
		$gender: Gender
		$available: Boolean
	) {
		items(
			where: {
				id: $id
				take: $take
				skip: $skip
				sortBy: $sortBy
				sortOrder: $sortOrder
				priceFrom: $priceFrom
				priceTo: $priceTo
				name: $name
				category: $category
				gender: $gender
				available: $available
			}
		) {
			select {
				id
				name
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
			maxPrice
			count
		}
	}
`);
