import { redirect } from "next/navigation";
import type { UserRole } from "@/gql/graphql";
import { me as meDoc } from "@/graphql/queries/ME";
import { query } from "./apollo/rsc";

/**
 * Server-side auth gates (#71/#72/#29) — one home for the "fetch `me` → redirect"
 * shape the route-group layouts share, so the auth rules live in one place rather
 * than copy-pasted per layout. Transitively server-only (it calls the
 * `server-only` RSC client), so it never reaches the browser.
 */

/** Staff = catalogue/order admins. Also reused by the header once #73 revives it. */
export function isStaff(role: UserRole | null | undefined): boolean {
	return role === "ADMIN" || role === "EMPLOYEE";
}

/** The current session user (server-side, cookie-forwarded), or `null`. */
async function getMe() {
	const { data } = await query({ query: meDoc });
	return data?.me ?? null;
}

/** Require any authenticated user (CUSTOMER-level); else → sign-in. */
export async function requireCustomer() {
	const user = await getMe();
	if (!user) {
		redirect("/sign?redirected=true");
	}
	return user;
}

/** Require staff (ADMIN or EMPLOYEE); anonymous → sign-in, non-staff → home. */
export async function requireStaff() {
	const user = await getMe();
	if (!user) {
		redirect("/sign?redirected=true");
	}
	if (!isStaff(user.role)) {
		redirect("/");
	}
	return user;
}

/** Require ADMIN specifically (user administration); anyone else → home. */
export async function requireAdmin() {
	const user = await getMe();
	if (user?.role !== "ADMIN") {
		redirect("/");
	}
	return user;
}

/** Reverse gate: an already-authenticated visitor is redirected away. */
export async function redirectIfAuthenticated(to = "/") {
	const user = await getMe();
	if (user) {
		redirect(to);
	}
}
