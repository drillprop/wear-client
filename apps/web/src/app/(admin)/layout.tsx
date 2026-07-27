import type { ReactNode } from "react";
import { requireStaff } from "@/app/lib/auth";

/**
 * `(admin)` server-layout auth gate (#72) — extends the `(account)` authenticated
 * gate with a staff role check. `requireStaff` runs `me` server-side; an anonymous
 * visitor is sent to sign-in and a signed-in non-staff customer is redirected
 * home, both before any admin child renders. Only ADMIN / EMPLOYEE reach the tree.
 */
export default async function AdminLayout({
	children,
}: {
	children: ReactNode;
}) {
	await requireStaff();

	return <>{children}</>;
}
