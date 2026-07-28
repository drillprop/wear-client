import type React from "react";
import getGenderCategories from "../../utils/getGenderCategories";
import LinkAnchor from "../LinkAnchor/LinkAnchor";

interface Props {
	gender: string;
}

/**
 * Shop category side-nav (#85). The shared `sideNav.styles.ts` primitives are
 * inlined here as Tailwind: the sticky column hides below `lg` (the old
 * desktop-first `max-width:900` → mobile-first `hidden lg:block`), the grays map
 * onto the neutral tokens, and each category item darkens to `foreground` on
 * hover. `sideNav.styles.ts` itself stays until `AdminSideNav` is ported (#89),
 * then is removed at the #90 teardown.
 */
const ShopSideNav: React.FC<Props> = ({ gender }) => {
	const genderPath = gender.toLowerCase();
	return (
		<div className="relative hidden lg:block">
			<nav className="sticky top-[140px]">
				<LinkAnchor href={`/shop/${genderPath}`}>
					<h1 className="m-0 font-roboto text-3 font-bold text-foreground uppercase">
						{gender}
					</h1>
				</LinkAnchor>
				<ul className="mt-[30px] p-0">
					{getGenderCategories(gender).map((category) => (
						<li
							key={category}
							className="mt-[14px] font-roboto text-2 font-normal text-muted-foreground uppercase hover:text-foreground"
						>
							<LinkAnchor
								wordToHighlight={category.toLowerCase()}
								href={`/shop/${genderPath}/${category.toLowerCase()}`}
							>
								{category}
							</LinkAnchor>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};

export default ShopSideNav;
