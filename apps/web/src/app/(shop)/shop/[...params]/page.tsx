import type { Metadata } from "next";
import { Suspense } from "react";
import { PreloadQuery } from "@/app/lib/apollo/rsc";
import { items } from "@/graphql/queries/ITEMS";
import { parsePage } from "@/utils/pagination";
import { itemsVariables } from "../itemsVariables";
import ShopContent from "./shop-content";

// Hybrid-prefetch page (#29): the RSC `PreloadQuery` fetches items server-side
// through the internal API, so it is rendered per request, never statically
// prerendered — a `next build` with no INTERNAL_API_URL must not hit the API.
export const dynamic = "force-dynamic";

interface ShopPageProps {
	params: Promise<{ params: string[] }>;
	searchParams: Promise<{ page?: string }>;
}

function readSegments(segments: string[]) {
	const [gender, category] = segments;
	return { gender, category };
}

export async function generateMetadata({
	params,
}: ShopPageProps): Promise<Metadata> {
	const { params: segments } = await params;
	const { gender, category } = readSegments(segments);
	const label = [gender, category].filter(Boolean).join(" | ");
	return { title: label ? `wear | ${label}` : "wear" };
}

/**
 * Shop catalogue (`/shop/[...params]`) — the hybrid-prefetch entry (#69/#29).
 * The server prefetches the first page of `Items` for the requested
 * gender/category via `PreloadQuery`, priming the browser cache; the client leaf
 * hydrates from it and owns filter / sort / pagination refetches.
 */
export default async function ShopPage({
	params,
	searchParams,
}: ShopPageProps) {
	const { params: segments } = await params;
	const { page: pageParam } = await searchParams;
	const { gender, category } = readSegments(segments);
	const page = parsePage(pageParam);

	return (
		<PreloadQuery
			query={items}
			variables={itemsVariables({ gender, category, page })}
		>
			<Suspense>
				<ShopContent gender={gender} category={category} page={page} />
			</Suspense>
		</PreloadQuery>
	);
}
