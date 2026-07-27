import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { query } from "@/app/lib/apollo/rsc";
import { me } from "@/graphql/queries/ME";
import SignContent from "./sign-content";

export const metadata: Metadata = { title: "wear | sign in" };

/**
 * Sign-in / register (`/sign`) with the server-side reverse gate (#70/#29): `me`
 * runs on the server and an already-authenticated visitor is redirected home
 * before the forms render — no client round-trip, no flash of the sign form.
 */
export default async function SignPage() {
	const { data } = await query({ query: me });
	if (data?.me) {
		redirect("/");
	}
	return <SignContent />;
}
