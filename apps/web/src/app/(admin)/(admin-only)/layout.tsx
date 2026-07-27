import type { ReactNode } from "react";
import { requireAdmin } from "@/app/lib/auth";

/**
 * ADMIN-only nested gate (#72). The parent `(admin)` layout already admits
 * ADMIN + EMPLOYEE; this inner layout narrows the user-administration routes
 * (`/admin/user`, `/admin/users`) back to ADMIN, matching the old
 * `withPrivateRoute(..., "ADMIN")` on those pages — an EMPLOYEE managing another
 * user's role was never allowed.
 */
export default async function AdminOnlyLayout({
	children,
}: {
	children: ReactNode;
}) {
	await requireAdmin();

	return <>{children}</>;
}
