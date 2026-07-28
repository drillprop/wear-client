import type React from "react";
import LinkAnchor from "../LinkAnchor/LinkAnchor";
import {
	SideNav,
	sideNavItemClass,
	sideNavListClass,
	sideNavTitleClass,
} from "../SideNav/SideNav";

/**
 * Admin side-nav (#89). Composes the shared `SideNav` scaffold — the Tailwind
 * port of `sideNav.styles.ts` that `ShopSideNav`/`AccountSideNav` already use —
 * so all three surfaces share one shape instead of re-inlining it. Each link
 * darkens to `foreground` on hover.
 */
const AdminSideNav: React.FC = () => {
	return (
		<SideNav>
			<h1 className={sideNavTitleClass}>ADMIN PANEL</h1>
			<ul className={sideNavListClass}>
				<li className={sideNavItemClass}>
					<LinkAnchor wordToHighlight="users" href="/admin/users">
						users
					</LinkAnchor>
				</li>
				<li className={sideNavItemClass}>
					<LinkAnchor wordToHighlight="items" href="/admin/items">
						items
					</LinkAnchor>
				</li>
				<li className={sideNavItemClass}>
					<LinkAnchor wordToHighlight="orders" href="/admin/orders">
						user's orders
					</LinkAnchor>
				</li>
			</ul>
		</SideNav>
	);
};

export default AdminSideNav;
