"use client";
import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { HomePageWrapper } from "@/components/Home/Home.styles";
import {
	Image,
	ImageTitle,
	ImageWrapper,
} from "@/components/HomePageImage/HomepageImage.styles";
import { homeItemCountQuery } from "./graphql/queries";

function Tile({
	href,
	imageUrl,
	children,
}: {
	href: string;
	imageUrl: string;
	children: ReactNode;
}) {
	return (
		<Link href={href} style={{ textDecoration: "none" }}>
			<ImageWrapper>
				<ImageTitle>{children}</ImageTitle>
				<Image imageUrl={imageUrl} />
			</ImageWrapper>
		</Link>
	);
}

/**
 * Proves the full data path end-to-end: this runs on the client, so `useQuery`
 * goes browser → same-origin `/api/graphql` proxy → apps/api, and renders the
 * result. The real GraphQL round-trip the walking skeleton exists to demonstrate.
 */
function ApiProbe() {
	const { data, loading, error } = useQuery(homeItemCountQuery);

	if (loading) {
		return <p data-testid="api-probe">Connecting to the API…</p>;
	}
	if (error) {
		return <p data-testid="api-probe">API error: {error.message}</p>;
	}
	return (
		<p data-testid="api-probe">
			API reachable — {data?.items.count ?? 0} items in the catalogue.
		</p>
	);
}

export default function HomeContent() {
	return (
		<>
			<HomePageWrapper>
				<Tile href="/shop/woman" imageUrl="/woman-in-summer-fashion.jpg">
					for her
				</Tile>
				<Tile href="/shop/man" imageUrl="/man-looks-out-window.jpg">
					for him
				</Tile>
			</HomePageWrapper>
			<ApiProbe />
		</>
	);
}
