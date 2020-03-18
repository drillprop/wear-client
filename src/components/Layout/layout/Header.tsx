import React from 'react';
import LinkAnchor from '../../LinkAnchor/LinkAnchor';
import { HeaderWrapper, Logo, Navigation, Ul, Li } from './Header.styles';
import HamburgerMenu from './header/HamburgerMenu';
import CartDropdown from './header/CartDropdown';
import ProfileDropDown from './header/ProfileDropDown';

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <LinkAnchor href='/'>
        <Logo>wear</Logo>
      </LinkAnchor>
      <Navigation>
        <Ul>
          <Li>
            <LinkAnchor highlight href='/woman'>
              woman
            </LinkAnchor>
          </Li>
          <Li>
            <LinkAnchor highlight href='/man'>
              man
            </LinkAnchor>
          </Li>
        </Ul>
        <Ul>
          <ProfileDropDown />
          <CartDropdown />
        </Ul>
      </Navigation>
      <HamburgerMenu />
    </HeaderWrapper>
  );
};

export default Header;
