import React from 'react';
import { Logo, HeaderWrapper, Navigation, Ul, Li } from './Header.styles';
import { Link } from 'react-router-dom';
import { ReactComponent as ShoppingIcon } from '../../../assets/shoping-icon.svg';
import { ReactComponent as UserIcon } from '../../../assets/user-icon.svg';
import HamburgerMenu from './header/HamburgerMenu';

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
            <Li>
              <UserIcon />
              your account
            </Li>
          </Link>
          <Link to='checkout'>
            <Li>
              <ShoppingIcon /> cart
            </Li>
          </Link>
        </Ul>
      </Navigation>
      <HamburgerMenu />
    </HeaderWrapper>
  );
};

export default Header;
