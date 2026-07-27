import type { Metadata } from "next";
import { Suspense } from "react";
import Items from "@/components/Items/Items";

export const metadata: Metadata = { title: "wear | admin — items" };

export default function AdminItemsPage() {
	return (
		<Suspense>
			<Items />
		</Suspense>
	);
}
