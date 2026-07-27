import type { Metadata } from "next";
import { Suspense } from "react";
import Users from "@/components/Users/Users";

export const metadata: Metadata = { title: "wear | admin — users" };

export default function AdminUsersPage() {
	return (
		<Suspense>
			<Users />
		</Suspense>
	);
}
