import { builder } from "../builder.js";

/**
 * `SortOrder` — the ascending/descending direction shared by every paginated
 * search input (`items` here, `users`/`orders` in later slices). Lives at the
 * shared root so those inputs reference one enum instead of redefining it.
 */
export const SortOrderEnum = builder.enumType("SortOrder", {
	values: ["ASC", "DESC"] as const,
});
