import type { Metadata } from "next";
import { redirectIfAuthenticated } from "@/app/lib/auth";
import SignContent from "./sign-content";

export const metadata: Metadata = { title: "wear | sign in" };

// Request/session-dependent: the reverse gate fetches `me` server-side through
// the cookie-forwarding RSC client, so this page is never statically
// prerendered — a `next build` with no INTERNAL_API_URL must not hit the API.
export const dynamic = "force-dynamic";

/**
 * Sign-in / register (`/sign`) with the server-side reverse gate (#70/#29): `me`
 * runs on the server and an already-authenticated visitor is redirected home
 * before the forms render — no client round-trip, no flash of the sign form.
 */
export default async function SignPage() {
	await redirectIfAuthenticated("/");
	return <SignContent />;
}
