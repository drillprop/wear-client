import React from 'react';
import { Logo, HeaderWrapper, Navigation, Ul, Li } from './Header.styles';

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Logo to='/'>wear</Logo>
      <Navigation>
        <Ul>
          <Li>women</Li>
          <Li>men</Li>
        </Ul>
        <Ul>
          <Li>your account</Li>
          <Li>cart</Li>
        </Ul>
      </Navigation>
    </HeaderWrapper>
  );
};

export default Header;
