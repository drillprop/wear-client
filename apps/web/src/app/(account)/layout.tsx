import type { ReactNode } from "react";
import { PreloadQuery } from "@/app/lib/apollo/rsc";
import { requireCustomer } from "@/app/lib/auth";
import { me } from "@/graphql/queries/ME";

/**
 * `(account)` server-layout auth gate (#71/#29) — the pattern that replaces the
 * getInitialProps `withPrivateRoute` HOC. `requireCustomer` runs `me` server-side
 * and `redirect()`s a signed-out visitor to sign-in *before any child renders* —
 * no content flash, no client round-trip. CUSTOMER-level admits any authenticated
 * user (matching the old HOC default); the staff-only restriction lives on
 * `(admin)`. Ownership is enforced server-side: `me`/`userOrders`/the account
 * mutations all resolve against the session user.
 *
 * `PreloadQuery` re-primes `me` into the browser cache so the account forms'
 * `useQuery(me)` hydrate from the server fetch instead of waterfalling.
 */
export default async function AccountLayout({
	children,
}: {
	children: ReactNode;
}) {
	await requireCustomer();

	return <PreloadQuery query={me}>{children}</PreloadQuery>;
}
