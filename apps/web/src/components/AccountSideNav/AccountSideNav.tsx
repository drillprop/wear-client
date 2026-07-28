import type React from "react";
import LinkAnchor from "../LinkAnchor/LinkAnchor";
import {
	SideNav,
	sideNavItemClass,
	sideNavListClass,
	sideNavTitleClass,
} from "../SideNav/SideNav";
import SignoutButton from "../SignoutButton/SignoutButton";

/**
 * Account side-nav (#88). Composes the shared `SideNav` scaffold; the last item
 * is the shared `SignoutButton`, which already renders as a nav link.
 */
const AccountSideNav: React.FC = () => {
	return (
		<SideNav>
			<h1 className={sideNavTitleClass}>account</h1>
			<ul className={sideNavListClass}>
				<li className={sideNavItemClass}>
					<LinkAnchor wordToHighlight="profile" href="/account/profile">
						profile
					</LinkAnchor>
				</li>
				<li className={sideNavItemClass}>
					<LinkAnchor wordToHighlight="contact" href="/account/contact">
						contact details
					</LinkAnchor>
				</li>
				<li className={sideNavItemClass}>
					<LinkAnchor wordToHighlight="orders" href="/account/orders">
						orders
					</LinkAnchor>
				</li>
				<li className={sideNavItemClass}>
					<SignoutButton />
				</li>
			</ul>
		</SideNav>
	);
};

export default AccountSideNav;
