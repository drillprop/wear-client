import type { Metadata } from "next";
import { Suspense } from "react";
import SingleUser from "@/components/SingleUser/SingleUser";

export const metadata: Metadata = { title: "wear | admin — user" };

/** `SingleUser` reads the `?id=` search param, so it renders under Suspense. */
export default function AdminUserPage() {
	return (
		<Suspense>
			<SingleUser />
		</Suspense>
	);
}
