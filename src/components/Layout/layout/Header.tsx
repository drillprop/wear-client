import type React from "react";
import LinkAnchor from "../../LinkAnchor/LinkAnchor";
import { HeaderWrapper, Li, Logo, Navigation, Ul } from "./Header.styles";
import CartDropdown from "./header/CartDropdown";
import MobileMenu from "./header/MobileMenu";
import ProfileDropDown from "./header/ProfileDropDown";

const Header: React.FC = () => {
	return (
		<HeaderWrapper>
			<LinkAnchor href="/">
				<Logo>wear</Logo>
			</LinkAnchor>
			<Navigation>
				<Ul>
					<Li>
						<LinkAnchor
							href="/shop/[...params]"
							as="/shop/woman"
							wordToHighlight="woman"
						>
							woman
						</LinkAnchor>
					</Li>
					<Li>
						<LinkAnchor
							wordToHighlight="man"
							href="/shop/[...params]"
							as="/shop/man"
						>
							man
						</LinkAnchor>
					</Li>
				</Ul>
				<Ul>
					<ProfileDropDown />
					<CartDropdown />
				</Ul>
				<MobileMenu />
			</Navigation>
		</HeaderWrapper>
	);
};

export default Header;
