import type React from "react";
import LinkAnchor from "../LinkAnchor/LinkAnchor";
import SignoutButton from "../SignoutButton/SignoutButton";

/**
 * Account side-nav (#88). The shared `sideNav.styles.ts` primitives are inlined
 * here as Tailwind (matching `ShopSideNav`): the sticky column hides below `lg`
 * (`max-width:900` → mobile-first `hidden lg:block`), grays map onto the neutral
 * tokens, items darken to `foreground` on hover. The `SignoutButton` is styled
 * to read as a nav link (transparent, inheriting the item's font/colour) rather
 * than as a default UA button. `sideNav.styles.ts` stays until `AdminSideNav` is
 * ported (#89), then is removed at the #90 teardown.
 */
const itemClass =
	"mt-[14px] font-roboto text-2 font-normal text-muted-foreground uppercase hover:text-foreground";

const AccountSideNav: React.FC = () => {
	return (
		<div className="relative hidden lg:block">
			<nav className="sticky top-[140px]">
				<h1 className="m-0 font-roboto text-3 font-bold text-foreground uppercase">
					account
				</h1>
				<ul className="mt-[30px] p-0">
					<li className={itemClass}>
						<LinkAnchor wordToHighlight="profile" href="/account/profile">
							profile
						</LinkAnchor>
					</li>
					<li className={itemClass}>
						<LinkAnchor wordToHighlight="contact" href="/account/contact">
							contact details
						</LinkAnchor>
					</li>
					<li className={itemClass}>
						<LinkAnchor wordToHighlight="orders" href="/account/orders">
							orders
						</LinkAnchor>
					</li>
					<li className={itemClass}>
						<SignoutButton className="cursor-pointer border-none bg-transparent p-0 font-[inherit] text-inherit uppercase" />
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default AccountSideNav;
