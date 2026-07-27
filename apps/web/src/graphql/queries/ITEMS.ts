import { gql } from "@apollo/client-v3";
import { graphql } from "@/gql";

/**
 * The `Items` catalogue query. Two exports during the migration:
 *
 * - `items` — the client-preset `graphql()` document consumed by the App Router
 *   shop slice (RSC `PreloadQuery` + client leaf).
 * - default `gql` — kept for the unmigrated Pages Router admin (`CreateItemForm`,
 *   `ItemRow`) that still passes it as a `refetchQueries` DocumentNode. Ignored by
 *   the client-preset codegen (which extracts only the `graphql` tag), so the two
 *   never collide. Removed at admin cutover.
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

export default gql`
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
`;
