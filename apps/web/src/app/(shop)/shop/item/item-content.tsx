"use client";
import { useQuery } from "@apollo/client/react";
import { useSearchParams } from "next/navigation";
import SingleProduct from "@/components/SingleProduct/SingleProduct";
import { singleItem } from "@/graphql/queries/SINGLE_ITEM";

/**
 * Single-item client leaf (#69). Reads the `id` search param and the cache primed
 * by the RSC `PreloadQuery`, rendering the shared `SingleProduct` (sizes, add to
 * cart) hydrated from that first paint.
 */
export default function ItemContent() {
	const id = useSearchParams()?.get("id") ?? "";
	const { data, loading } = useQuery(singleItem, { variables: { id } });
	return <SingleProduct item={data?.item} loading={loading} />;
}
