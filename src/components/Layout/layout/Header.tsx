import React from 'react';
import LinkAnchor from '../../LinkAnchor/LinkAnchor';
import { HeaderWrapper, Logo, Navigation } from './Header.styles';
import HamburgerMenu from './header/HamburgerMenu';
import ShopNav from './header/ShopNav';
import UserNav from './header/UserNav';

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <LinkAnchor href='/'>
        <Logo>wear</Logo>
      </LinkAnchor>
      <Navigation>
        <ShopNav />
        <UserNav />
      </Navigation>
      <HamburgerMenu />
    </HeaderWrapper>
  );
};

export default Header;
