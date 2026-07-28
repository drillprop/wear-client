import type { UserRole } from "@/gql/graphql";

/**
 * Role predicates for the auth-aware chrome (#79). Centralises the `role ===`
 * string checks the header dropdown and mobile menu would otherwise scatter, so
 * adding or renaming a role touches one place.
 */
export const isAdmin = (role?: UserRole | null): boolean => role === "ADMIN";

export const isStaff = (role?: UserRole | null): boolean =>
	role === "ADMIN" || role === "EMPLOYEE";
