import type { ReactNode } from "react";
import { requireStaff } from "@/app/lib/auth";

// Request/session-dependent: the gate fetches `me` server-side through the
// cookie-forwarding RSC client, so this segment (and every admin page) is never
// statically prerendered — a `next build` with no INTERNAL_API_URL must not hit
// the API. See app/lib/apollo/rsc.ts.
export const dynamic = "force-dynamic";

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
