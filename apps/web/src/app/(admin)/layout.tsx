import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { query } from "@/app/lib/apollo/rsc";
import { me } from "@/graphql/queries/ME";

/**
 * `(admin)` server-layout auth gate (#72) — extends the `(account)` authenticated
 * gate with a staff role check. `me` runs server-side; an anonymous visitor is
 * sent to sign-in and a signed-in non-staff customer is redirected home, both
 * before any admin child renders. Only ADMIN / EMPLOYEE reach the admin tree.
 */
export default async function AdminLayout({
	children,
}: {
	children: ReactNode;
}) {
	const { data } = await query({ query: me });
	if (!data?.me) {
		redirect("/sign?redirected=true");
	}
	const isStaff = data.me.role === "ADMIN" || data.me.role === "EMPLOYEE";
	if (!isStaff) {
		redirect("/");
	}

	return <>{children}</>;
}
