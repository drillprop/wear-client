import React from 'react';
import LinkAnchor from '../../LinkAnchor/LinkAnchor';
import { HeaderWrapper, Logo } from './Header.styles';
import HeaderNav from './header/HeaderNav';

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <LinkAnchor href='/'>
        <Logo>wear</Logo>
      </LinkAnchor>
      <HeaderNav />
    </HeaderWrapper>
  );
};

export default Header;
