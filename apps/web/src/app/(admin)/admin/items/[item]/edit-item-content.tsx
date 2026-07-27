"use client";
import { useQuery } from "@apollo/client/react";
import { useParams } from "next/navigation";
import EditItemForm from "@/components/EditItemForm/EditItemForm";
import { singleItem } from "@/graphql/queries/SINGLE_ITEM";

/**
 * Admin edit-item client leaf. Reads the `[item]` route param, fetches the item
 * (server-primed via the RSC `PreloadQuery`), and renders the edit form.
 */
export default function EditItemContent() {
	const raw = useParams()?.item;
	const id = Array.isArray(raw) ? (raw[0] ?? "") : (raw ?? "");
	const { data } = useQuery(singleItem, { variables: { id } });
	return <EditItemForm item={data?.item} />;
}
