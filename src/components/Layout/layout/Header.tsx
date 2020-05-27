import React from 'react';
import LinkAnchor from '../../LinkAnchor/LinkAnchor';
import { HeaderWrapper, Logo, Ul, Navigation, Li } from './Header.styles';
import ProfileDropDown from './header/ProfileDropDown';
import CartDropdown from './header/CartDropdown';
import MobileMenu from './header/MobileMenu';

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <LinkAnchor href='/'>
        <Logo>wear</Logo>
      </LinkAnchor>
      <Navigation>
        <Ul>
          <Li>
            <LinkAnchor href='/[gender]' as='/woman' wordToHighlight='woman'>
              woman
            </LinkAnchor>
          </Li>
          <Li>
            <LinkAnchor wordToHighlight='man' href='/[gender]' as='/man'>
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
