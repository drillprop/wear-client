import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { PreloadQuery, query } from "@/app/lib/apollo/rsc";
import { me } from "@/graphql/queries/ME";

/**
 * `(account)` server-layout auth gate (#71/#29) — the pattern that replaces the
 * getInitialProps `withPrivateRoute` HOC. `me` runs on the server (forwarding the
 * session cookie); a signed-out visitor is `redirect()`ed to sign-in *before any
 * child renders* — no content flash, no client round-trip. Ownership is enforced
 * server-side: `me`/`userOrders`/the account mutations all resolve against the
 * session user, so a signed-in customer can only ever see their own data.
 *
 * `PreloadQuery` re-primes `me` into the browser cache so the account forms'
 * `useQuery(me)` hydrate from the server fetch instead of waterfalling.
 */
export default async function AccountLayout({
	children,
}: {
	children: ReactNode;
}) {
	const { data } = await query({ query: me });
	if (!data?.me) {
		redirect("/sign?redirected=true");
	}

	return <PreloadQuery query={me}>{children}</PreloadQuery>;
}
