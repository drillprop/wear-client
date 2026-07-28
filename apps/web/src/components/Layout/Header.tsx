import type React from "react";
import LinkAnchor from "@/components/LinkAnchor/LinkAnchor";
import CartDropdown from "./header/CartDropdown";
import MobileMenu from "./header/MobileMenu";
import { navItem } from "./header/navItem";
import ProfileDropDown from "./header/ProfileDropDown";

/**
 * Site header (#79). The deleted Pages-Router `Header` rebuilt on Tailwind: a
 * fixed, centred bar (`max-w-[1300px]`) with the italic "wear" logo and, from
 * `lg` up, the woman/man primary nav plus the profile + cart areas; below `lg`
 * the `MobileMenu` hamburger takes over (the old `max-width:900` toggle inverted
 * to `hidden lg:flex` / `lg:hidden`). The off-white/black grays map onto the
 * shadcn `background`/`foreground` tokens.
 */
const navList =
	"m-0 hidden flex-grow list-none gap-[40px] p-0 font-roboto text-1 tracking-[1px] lg:flex";

const Header: React.FC = () => {
	return (
		<header className="fixed top-0 left-1/2 z-[2] mx-auto grid w-full max-w-[1300px] -translate-x-1/2 grid-cols-[200px_1fr] bg-background px-[25px] sm:px-[50px]">
			<LinkAnchor href="/">
				<h1 className="m-0 font-roboto text-9 leading-[1.5] font-bold text-foreground italic">
					wear
				</h1>
			</LinkAnchor>
			<nav className="flex items-center justify-between">
				<ul className={`${navList} justify-center`}>
					<li className={navItem}>
						<LinkAnchor href="/shop/woman" wordToHighlight="woman">
							woman
						</LinkAnchor>
					</li>
					<li className={navItem}>
						<LinkAnchor href="/shop/man" wordToHighlight="man">
							man
						</LinkAnchor>
					</li>
				</ul>
				<ul className={`${navList} justify-end`}>
					<ProfileDropDown />
					<CartDropdown />
				</ul>
				<MobileMenu />
			</nav>
		</header>
	);
};

export default Header;
