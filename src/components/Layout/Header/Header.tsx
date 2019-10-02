import React from 'react';
import { Logo, HeaderWrapper, Navigation, Ul, Li } from './Header.styles';
import { Link } from 'react-router-dom';

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
          <Link to='sign'>
            <Li>your account</Li>
          </Link>
          <Li>cart</Li>
        </Ul>
      </Navigation>
    </HeaderWrapper>
  );
};

export default Header;
