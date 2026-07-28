import type { FC, PropsWithChildren } from "react";

/**
 * Shared side-nav scaffold (#85/#88) — the Tailwind port of the cross-surface
 * `sideNav.styles.ts` primitives, factored out so `ShopSideNav` and
 * `AccountSideNav` (and `AdminSideNav` once it lands, #89) share one shape
 * instead of re-inlining it. The sticky column hides below `lg` (the old
 * desktop-first `max-width:900`); the grays map onto the neutral tokens. The
 * item class darkens to `foreground` on hover. `sideNav.styles.ts` stays until
 * the admin side-nav is ported, then is removed at the #90 teardown.
 */
export const SideNav: FC<PropsWithChildren> = ({ children }) => (
	<div className="relative hidden lg:block">
		<nav className="sticky top-[140px]">{children}</nav>
	</div>
);

export const sideNavTitleClass =
	"m-0 font-roboto text-3 font-bold text-foreground uppercase";

export const sideNavListClass = "mt-[30px] p-0";

export const sideNavItemClass =
	"mt-[14px] font-roboto text-2 font-normal text-muted-foreground uppercase hover:text-foreground";
