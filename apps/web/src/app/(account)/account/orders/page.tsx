import type { Metadata } from "next";
import { Suspense } from "react";
import AccountOrders from "@/components/AccountOrders/AccountOrders";

export const metadata: Metadata = { title: "wear | orders" };

/**
 * `AccountOrders` reads the `?page=` search param (App Router `useSearchParams`),
 * so it renders inside a Suspense boundary.
 */
export default function OrdersPage() {
	return (
		<Suspense>
			<AccountOrders />
		</Suspense>
	);
}
