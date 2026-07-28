"use client";
import { useQuery } from "@apollo/client/react";
import { cn } from "@wear/ui/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LinkAnchor from "@/components/LinkAnchor/LinkAnchor";
import SignoutButton from "@/components/SignoutButton/SignoutButton";
import ToggleableList from "@/components/ToggleableList/ToggleableList";
import { useCart } from "@/contexts/CartContext";
import { me } from "@/graphql/queries/ME";
import getGenderCategories from "@/utils/getGenderCategories";
import { isStaff } from "@/utils/roles";

/**
 * Mobile menu (#79). Shown below `lg` (the old desktop-first `max-width:900`
 * hamburger). Rebuilt on Tailwind + Apollo v4 — `useMeQuery`/`useSignoutMutation`
 * become the `@/gql` `me` document + the shared `SignoutButton`, and the old
 * `framer-motion` slide (not a dependency of this app) is a CSS
 * `translate-x` transition. The panel lists account links (or a login link),
 * the woman/man category groups, an employee-only admin group, the cart and
 * logout. `LinkAnchor` uses direct App-Router hrefs (no `as`).
 */
const MobileMenu = () => {
	const manCategories = getGenderCategories("MAN");
	const womanCategories = getGenderCategories("WOMAN");
	const [menuActive, setMenuActive] = useState(false);
	const pathname = usePathname();
	const { data } = useQuery(me);
	const { cartItems } = useCart();
	const cartItemsLength = cartItems.length;

	// Close the menu whenever the route changes (the old `asPath` effect).
	// biome-ignore lint/correctness/useExhaustiveDependencies: closing on pathname change is the whole intent
	useEffect(() => {
		setMenuActive(false);
	}, [pathname]);

	const isUser = data?.me;
	const isEmployee = isStaff(data?.me?.role);

	const bar = "block h-[3px] w-[28px] transition-transform";
	const topItem =
		"mt-[30px] mr-[80px] cursor-pointer text-right text-4 uppercase";
	const subItem =
		"mt-[14px] text-right font-roboto text-2 text-primary-foreground/70";

	return (
		<div className="lg:hidden">
			<button
				type="button"
				aria-label="menu"
				aria-expanded={menuActive}
				onClick={() => setMenuActive((active) => !active)}
				className="absolute top-1/2 right-[60px] z-[4] flex size-[29px] -translate-y-1/2 flex-col justify-center gap-[5px]"
			>
				<span
					className={cn(
						bar,
						menuActive
							? "translate-y-[8px] rotate-45 bg-background"
							: "bg-foreground",
					)}
				/>
				<span
					className={cn(
						"block h-[3px] w-[28px] transition-opacity",
						menuActive ? "opacity-0" : "bg-foreground",
					)}
				/>
				<span
					className={cn(
						bar,
						menuActive
							? "-translate-y-[8px] -rotate-45 bg-background"
							: "bg-foreground",
					)}
				/>
			</button>
			<div
				className={cn(
					"fixed top-0 right-0 z-[3] h-screen w-[290px] overflow-y-auto bg-primary text-primary-foreground shadow-[0_0_0_100vh_rgba(0,0,0,0.3)] transition-transform duration-300",
					menuActive ? "translate-x-0" : "translate-x-full",
				)}
				aria-hidden={!menuActive}
			>
				<ul className="mx-auto my-[100px] p-0">
					{isUser ? (
						<ToggleableList title="ACCOUNT" className={topItem}>
							<li className={subItem}>
								<LinkAnchor href="/account/profile">my profile</LinkAnchor>
							</li>
							<li className={subItem}>
								<LinkAnchor href="/account/contact">contact details</LinkAnchor>
							</li>
							<li className={subItem}>
								<LinkAnchor href="/account/orders">orders</LinkAnchor>
							</li>
						</ToggleableList>
					) : (
						<li className={topItem}>
							<LinkAnchor href="/sign">login</LinkAnchor>
						</li>
					)}
					<ToggleableList title="WOMAN" className={topItem}>
						{womanCategories.map((category) => (
							<li key={category} className={subItem}>
								<LinkAnchor href={`/shop/woman/${category.toLowerCase()}`}>
									{category}
								</LinkAnchor>
							</li>
						))}
					</ToggleableList>
					<ToggleableList title="MAN" className={topItem}>
						{manCategories.map((category) => (
							<li key={category} className={subItem}>
								<LinkAnchor href={`/shop/man/${category.toLowerCase()}`}>
									{category}
								</LinkAnchor>
							</li>
						))}
					</ToggleableList>
					{isEmployee && (
						<ToggleableList title="ADMIN" className={topItem}>
							<li className={subItem}>
								<LinkAnchor href="/admin/users">users</LinkAnchor>
							</li>
							<li className={subItem}>
								<LinkAnchor href="/admin/items">items</LinkAnchor>
							</li>
							<li className={subItem}>
								<LinkAnchor href="/admin/orders">user's orders</LinkAnchor>
							</li>
						</ToggleableList>
					)}
					<li className={topItem}>
						<LinkAnchor href="/cart">
							YOUR CART {cartItemsLength ? `(${cartItemsLength})` : ""}
						</LinkAnchor>
					</li>
					{isUser && (
						<li className={topItem}>
							<SignoutButton>LOGOUT</SignoutButton>
						</li>
					)}
				</ul>
			</div>
		</div>
	);
};

export default MobileMenu;
