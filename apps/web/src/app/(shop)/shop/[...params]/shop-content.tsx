"use client";
import { useQuery } from "@apollo/client/react";
import debounce from "lodash.debounce";
import { useMemo } from "react";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import NoItems from "@/components/NoItems/NoItems";
import AppPagination from "@/components/Pagination/AppPagination";
import { ShopFiltersWrapper, ShopWrapper } from "@/components/Shop/Shop.styles";
import NameAndPriceFilters from "@/components/Shop/shop/NameAndPriceFilters";
import Products from "@/components/Shop/shop/Products";
import SortAndPerPage from "@/components/Shop/shop/SortAndPerPage";
import ShopSideNav from "@/components/ShopSideNav/ShopSideNav";
import type { ItemsQueryVariables } from "@/gql/graphql";
import { items } from "@/graphql/queries/ITEMS";
import { SiteSubtitle, SiteWrapper } from "@/styles/site.styles";
import { itemsVariables, SHOP_TAKE } from "../itemsVariables";

interface Props {
	gender: string;
	category?: string;
	page: number;
}

/**
 * Shop client leaf (#69). Reads the cache primed by the RSC `PreloadQuery` for
 * the first paint (same `Items` variables), then owns filter / sort / price-range
 * refetches. Pagination is URL-driven: `AppPagination` rewrites `?page=`, `page`
 * flows back in as a prop, and Apollo refetches on the changed variables.
 */
export default function ShopContent({ gender, category, page }: Props) {
	const variables = useMemo(
		() => itemsVariables({ gender, category, page }),
		[gender, category, page],
	);

	const { data, refetch, loading } = useQuery(items, { variables });

	const basePath = category
		? `/shop/${gender.toLowerCase()}/${category.toLowerCase()}`
		: `/shop/${gender.toLowerCase()}`;

	const debouncedRefetch = useMemo(
		() =>
			debounce((next: Partial<ItemsQueryVariables>) => {
				refetch(next);
			}, 400),
		[refetch],
	);

	return (
		<SiteWrapper>
			<ShopSideNav gender={gender.toUpperCase()} />
			<div>
				<SiteSubtitle>shop</SiteSubtitle>
				<ShopFiltersWrapper>
					<NameAndPriceFilters
						maxPrice={data?.items.maxPrice || 0}
						refetch={debouncedRefetch}
						variables={variables}
					/>
					<SortAndPerPage
						refetch={refetch}
						variables={variables}
						basePath={basePath}
					/>
				</ShopFiltersWrapper>
				<ShopWrapper>
					{loading ? (
						<LoadingSpinner />
					) : (
						<>
							{!data?.items.select?.length && (
								<NoItems text={"No items found"} />
							)}
							<Products items={data?.items.select || []} />
							<AppPagination
								page={page || 1}
								total={data?.items.count}
								take={variables?.take || SHOP_TAKE}
							/>
						</>
					)}
				</ShopWrapper>
			</div>
		</SiteWrapper>
	);
}
