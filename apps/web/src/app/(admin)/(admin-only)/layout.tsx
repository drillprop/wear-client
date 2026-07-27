import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { query } from "@/app/lib/apollo/rsc";
import { me } from "@/graphql/queries/ME";

/**
 * ADMIN-only nested gate (#72). The parent `(admin)` layout already admits
 * ADMIN + EMPLOYEE; this inner layout narrows the user-administration routes
 * (`/admin/user`, `/admin/users`) back to ADMIN, matching the old
 * `withPrivateRoute(..., "ADMIN")` on those pages — an EMPLOYEE managing another
 * user's role was never allowed. Non-ADMIN staff are redirected home.
 */
export default async function AdminOnlyLayout({
	children,
}: {
	children: ReactNode;
}) {
	const { data } = await query({ query: me });
	if (data?.me?.role !== "ADMIN") {
		redirect("/");
	}

	return <>{children}</>;
}
