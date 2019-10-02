import React from 'react';
import { Logo, HeaderWrapper, Navigation, Ul, Li } from './Header.styles';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <Logo to='/'>wear</Logo>
      <Navigation>
        <Ul>
          <Link to='woman'>
            <Li>women</Li>
          </Link>
          <Link to='man'>
            <Li>men</Li>
          </Link>
        </Ul>
        <Ul>
          <Link to='sign'>
            <Li>your account</Li>
          </Link>
          <Link to='checkout'>
            <Li>cart</Li>
          </Link>
        </Ul>
      </Navigation>
    </HeaderWrapper>
  );
};

export default Header;
