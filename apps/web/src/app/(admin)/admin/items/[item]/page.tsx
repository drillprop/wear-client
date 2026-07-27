import type { Metadata } from "next";
import { PreloadQuery } from "@/app/lib/apollo/rsc";
import { singleItem } from "@/graphql/queries/SINGLE_ITEM";
import EditItemContent from "./edit-item-content";

export const metadata: Metadata = { title: "wear | admin — edit item" };

interface EditItemPageProps {
	params: Promise<{ item: string }>;
}

/**
 * Admin single-item edit (`/admin/items/[item]`). The server prefetches the item
 * so the edit form hydrates from the primed cache.
 */
export default async function EditItemPage({ params }: EditItemPageProps) {
	const { item } = await params;
	return (
		<PreloadQuery query={singleItem} variables={{ id: item }}>
			<EditItemContent />
		</PreloadQuery>
	);
}
