import React from 'react';
import { Navigation, Ul, Li } from './HeaderNav.styles';
import LinkAnchor from '../../../LinkAnchor/LinkAnchor';
import ProfileDropDown from './headerNav/ProfileDropDown';
import CartDropdown from './headerNav/CartDropdown';
import MobileMenu from './headerNav/MobileMenu';

const HeaderNav = () => {
  return (
    <>
      <Navigation>
        <Ul>
          <Li>
            <LinkAnchor
              href='/shop/[gender]'
              as='/shop/woman'
              wordToHighlight='woman'
            >
              woman
            </LinkAnchor>
          </Li>
          <Li>
            <LinkAnchor
              wordToHighlight='man'
              href='/shop/[gender]'
              as='/shop/man'
            >
              man
            </LinkAnchor>
          </Li>
        </Ul>
        <Ul>
          <ProfileDropDown />
          <CartDropdown />
        </Ul>
      </Navigation>
      <MobileMenu />
    </>
  );
};

export default HeaderNav;
