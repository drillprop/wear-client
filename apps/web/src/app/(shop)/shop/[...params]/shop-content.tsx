"use client";
import { useQuery } from "@apollo/client/react";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import NoItems from "@/components/NoItems/NoItems";
import AppPagination from "@/components/Pagination/AppPagination";
import NameAndPriceFilters from "@/components/Shop/shop/NameAndPriceFilters";
import Products from "@/components/Shop/shop/Products";
import SortAndPerPage from "@/components/Shop/shop/SortAndPerPage";
import ShopSideNav from "@/components/ShopSideNav/ShopSideNav";
import { SiteSubtitle, SiteWrapper } from "@/components/SiteLayout/SiteLayout";
import type { ItemsQueryVariables } from "@/gql/graphql";
import { items } from "@/graphql/queries/ITEMS";
import { itemsVariables, SHOP_TAKE } from "../itemsVariables";

interface Props {
	gender: string;
	category?: string;
	page: number;
}

/**
 * Shop client leaf (#69, restyled #85). Reads the cache primed by the RSC
 * `PreloadQuery` for the first paint (same `Items` variables), then owns filter
 * / sort / price-range refetches. Pagination is URL-driven: `AppPagination`
 * rewrites `?page=`, `page` flows back in as a prop, and Apollo refetches on the
 * changed variables.
 *
 * `Shop.styles.ts` ports to Tailwind inline: the filter bar is the auto-fit grid
 * with the old `::after` underline (`grays[5]` → `border`), and the loading
 * state centres the spinner well down the page (the old `.loading-spinner`
 * rule). `SiteWrapper`/`SiteSubtitle` now come from the shared `SiteLayout`.
 */
export default function ShopContent({ gender, category, page }: Props) {
	const variables = useMemo(
		() => itemsVariables({ gender, category, page }),
		[gender, category, page],
	);

	const { data, refetch, loading } = useQuery(items, { variables });
	const router = useRouter();

	const basePath = category
		? `/shop/${gender.toLowerCase()}/${category.toLowerCase()}`
		: `/shop/${gender.toLowerCase()}`;

	// Changing a price/name filter resets pagination to the first page (as the old
	// Pages Router shop did): drop `?page=` from the URL and refetch from skip 0,
	// so a filter can't leave you stranded on a now-empty page N.
	const debouncedRefetch = useMemo(
		() =>
			debounce((next: Partial<ItemsQueryVariables>) => {
				if (page > 1) {
					router.push(basePath);
				}
				refetch({ ...next, skip: 0 });
			}, 400),
		[refetch, router, basePath, page],
	);

	return (
		<SiteWrapper>
			<ShopSideNav gender={gender.toUpperCase()} />
			<div>
				<SiteSubtitle>shop</SiteSubtitle>
				<div className="relative mb-[40px] grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-x-[25px] after:absolute after:bottom-[-40px] after:h-px after:w-full after:bg-border after:content-['']">
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
				</div>
				<div className="h-full">
					{loading ? (
						<div className="mt-[150px] flex justify-center">
							<LoadingSpinner />
						</div>
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
				</div>
			</div>
		</SiteWrapper>
	);
}
