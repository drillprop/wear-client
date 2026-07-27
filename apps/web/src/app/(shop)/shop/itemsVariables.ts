import type { Category, Gender, ItemsQueryVariables } from "@/gql/graphql";

/** Catalogue page size — one source of truth for the RSC prefetch and the client leaf. */
export const SHOP_TAKE = 6;

/**
 * Build the `Items` variables from the route's catalogue segments and page. The
 * RSC `PreloadQuery` and the client leaf's `useQuery` must produce the *same*
 * variables so the client reads the server-primed cache entry instead of
 * refetching on first paint (the hybrid-prefetch pattern, #29).
 */
export function itemsVariables({
	gender,
	category,
	page,
}: {
	gender?: string;
	category?: string;
	page: number;
}): ItemsQueryVariables {
	const take = SHOP_TAKE;
	const skip = page * take - take || 0;
	return {
		gender: gender ? (gender.toUpperCase() as Gender) : undefined,
		category: category ? (category.toUpperCase() as Category) : undefined,
		skip,
		take,
		sortBy: "Item.createdAt",
		sortOrder: "DESC",
	};
}
