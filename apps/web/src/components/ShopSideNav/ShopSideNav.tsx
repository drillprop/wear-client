import type React from "react";
import getGenderCategories from "../../utils/getGenderCategories";
import LinkAnchor from "../LinkAnchor/LinkAnchor";
import {
	SideNav,
	sideNavItemClass,
	sideNavListClass,
	sideNavTitleClass,
} from "../SideNav/SideNav";

interface Props {
	gender: string;
}

/**
 * Shop category side-nav (#85). Composes the shared `SideNav` scaffold (the
 * Tailwind port of `sideNav.styles.ts`); the gender title links to the gender
 * landing and each category darkens on hover.
 */
const ShopSideNav: React.FC<Props> = ({ gender }) => {
	const genderPath = gender.toLowerCase();
	return (
		<SideNav>
			<LinkAnchor href={`/shop/${genderPath}`}>
				<h1 className={sideNavTitleClass}>{gender}</h1>
			</LinkAnchor>
			<ul className={sideNavListClass}>
				{getGenderCategories(gender).map((category) => (
					<li key={category} className={sideNavItemClass}>
						<LinkAnchor
							wordToHighlight={category.toLowerCase()}
							href={`/shop/${genderPath}/${category.toLowerCase()}`}
						>
							{category}
						</LinkAnchor>
					</li>
				))}
			</ul>
		</SideNav>
	);
};

export default ShopSideNav;
