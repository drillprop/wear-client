import type { Metadata } from "next";
import { Suspense } from "react";
import { PreloadQuery, query } from "@/app/lib/apollo/rsc";
import { singleItem } from "@/graphql/queries/SINGLE_ITEM";
import ItemContent from "./item-content";

interface ItemPageProps {
	searchParams: Promise<{ id?: string }>;
}

export async function generateMetadata({
	searchParams,
}: ItemPageProps): Promise<Metadata> {
	const { id } = await searchParams;
	if (!id) {
		return { title: "wear" };
	}
	const { data } = await query({ query: singleItem, variables: { id } });
	return { title: data?.item?.name ? `wear | ${data.item.name}` : "wear" };
}

/**
 * Single item (`/shop/item?id=…`) — hybrid-prefetch (#69). The server prefetches
 * the item so first paint carries its name/description/price for SEO; the client
 * leaf hydrates from the primed cache and drives the add-to-cart interaction.
 */
export default async function ItemPage({ searchParams }: ItemPageProps) {
	const { id } = await searchParams;
	return (
		<PreloadQuery query={singleItem} variables={{ id: id ?? "" }}>
			<Suspense>
				<ItemContent />
			</Suspense>
		</PreloadQuery>
	);
}
