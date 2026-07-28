/**
 * Header `<li>` base class (#79) — shared by the primary-nav items in `Header`
 * and the profile / cart dropdown items. Lives in its own leaf module so the
 * dropdowns don't import it from `Header` (which imports them back — an import
 * cycle).
 */
export const navItem = "relative ml-0 uppercase";
