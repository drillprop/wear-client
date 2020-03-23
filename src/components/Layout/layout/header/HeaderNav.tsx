import React from 'react';
import { Navigation, Ul, Li } from './HeaderNav.styles';
import LinkAnchor from '../../../LinkAnchor/LinkAnchor';
import ProfileDropDown from './headerNav/ProfileDropDown';
import CartDropdown from './headerNav/CartDropdown';
import HamburgerMenu from './headerNav/HamburgerMenu';

const HeaderNav = () => {
  return (
    <>
      <Navigation>
        <Ul>
          <Li>
            <LinkAnchor highlight href='/shop/[gender]' as='/shop/woman'>
              woman
            </LinkAnchor>
          </Li>
          <Li>
            <LinkAnchor highlight href='/shop/[gender]' as='/shop/man'>
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
    </>
  );
};

export default HeaderNav;
