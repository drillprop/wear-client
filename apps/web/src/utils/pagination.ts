/**
 * Pagination helpers shared by the App Router data pages (shop catalogue, account
 * orders). One home for the "page ↔ skip" arithmetic and the `?page=` parse so the
 * two pages can't drift.
 */

/** Skip offset for a 1-based page. Page ≤ 1 (or NaN) maps to 0. */
export function pageToSkip(page: number, take: number): number {
	return page * take - take || 0;
}

/** Parse a `?page=` param to a 1-based page number, defaulting to 1. */
export function parsePage(param: string | null | undefined): number {
	return parseInt(param ?? "", 10) || 1;
}
