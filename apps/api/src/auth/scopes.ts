import { eq } from "drizzle-orm";
import type { Context } from "../context.js";
import { user } from "../db/schema.js";

/**
 * The authorization scopes every gated operation checks against (#46), wired
 * into Pothos' scope-auth plugin as the per-request scope initializer.
 *
 * - `loggedIn` — any authenticated user
 * - `staff`    — ADMIN or EMPLOYEE (catalogue/order management)
 * - `admin`    — ADMIN only (user administration, role changes)
 */
export interface AuthScopes {
	loggedIn: boolean;
	staff: boolean;
	admin: boolean;
}

const ANONYMOUS: AuthScopes = { loggedIn: false, staff: false, admin: false };

/**
 * Resolve the current request's scopes from its `userId`. Runs one parameterized
 * lookup for the user's role; an unknown/absent user is treated as anonymous.
 * The scope-auth plugin memoizes the result per request, so this fires at most
 * once regardless of how many fields the operation gates.
 */
export async function resolveAuthScopes(ctx: Context): Promise<AuthScopes> {
	if (!ctx.userId) {
		return ANONYMOUS;
	}

	const [current] = await ctx.db
		.select({ role: user.role })
		.from(user)
		.where(eq(user.id, ctx.userId))
		.limit(1);

	if (!current) {
		return ANONYMOUS;
	}

	const admin = current.role === "ADMIN";
	const staff = admin || current.role === "EMPLOYEE";
	return { loggedIn: true, staff, admin };
}
