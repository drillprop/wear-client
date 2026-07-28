"use client";
import { useQuery } from "@apollo/client/react";
import { cn } from "@wear/ui/lib/utils";
import type React from "react";
import LinkAnchor from "@/components/LinkAnchor/LinkAnchor";
import SignoutButton from "@/components/SignoutButton/SignoutButton";
import { me } from "@/graphql/queries/ME";
import { isAdmin } from "@/utils/roles";
import { navItem } from "./navItem";

/**
 * Header profile area (#79). Rebuilt on Tailwind + Apollo v4: the old
 * `useMeQuery` (from the deleted `generated/types`) is the `@/gql` `me` document
 * on Apollo Client v4. Signed out it's a "login" link into `/sign`; signed in it
 * shows the email and a hover dropdown (my profile / orders / cart, an ADMIN-only
 * panel link, and logout). `:hover div` becomes `group` + `group-hover:block`;
 * the grays map onto the neutral tokens. Logout reuses the shared
 * `SignoutButton` (signout mutation → navigate home).
 */
const itemClass = "py-5 pl-[25px] first:pt-[40px]";

const ProfileDropDown: React.FC = () => {
	const { data } = useQuery(me);
	return (
		<li className={cn("group", navItem)}>
			<LinkAnchor href="/sign" className="flex items-center gap-[10px]">
				<img className="size-[14px]" src="/user-icon.svg" alt="profile icon" />
				{data?.me ? data.me.email : "login"}
			</LinkAnchor>
			{data?.me ? (
				<div className="absolute right-0 z-[2] hidden w-full min-w-[200px] bg-background group-hover:block">
					<ul className="m-0 p-0">
						<li className={itemClass}>
							<LinkAnchor href="/account/profile">my profile</LinkAnchor>
						</li>
						<li className={itemClass}>
							<LinkAnchor href="/account/orders">my orders</LinkAnchor>
						</li>
						<li className={itemClass}>
							<LinkAnchor href="/cart">my cart</LinkAnchor>
						</li>
						{isAdmin(data?.me?.role) && (
							<li className={cn(itemClass, "bg-secondary")}>
								<LinkAnchor href="/admin/users">admin panel</LinkAnchor>
							</li>
						)}
						<li className={cn(itemClass, "cursor-pointer")}>
							<SignoutButton>logout</SignoutButton>
						</li>
					</ul>
				</div>
			) : null}
		</li>
	);
};

export default ProfileDropDown;
