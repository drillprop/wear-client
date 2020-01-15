import React from 'react';
import { Logo, HeaderWrapper, Navigation, Ul, Li } from './Header.styles';
import HamburgerMenu from './header/HamburgerMenu';
import LinkAnchor from '../../LinkAnchor/LinkAnchor';
import { useMeQuery } from '../../../generated/types';

const Header: React.FC = () => {
  const { data } = useMeQuery();
  return (
    <HeaderWrapper>
      <LinkAnchor href='/'>
        <Logo>wear</Logo>
      </LinkAnchor>
      <Navigation>
        <Ul>
          <LinkAnchor href='/woman'>
            <Li>women</Li>
          </LinkAnchor>
          <LinkAnchor href='/man'>
            <Li>men</Li>
          </LinkAnchor>
        </Ul>
        <Ul>
          <LinkAnchor href='/sign'>
            <Li>
              <img src='/user-icon.svg' />
              {data?.me ? data.me.email : 'your account'}
            </Li>
          </LinkAnchor>
          <LinkAnchor href='/checkout'>
            <Li>
              <img src='/shoping-icon.svg' /> cart
            </Li>
          </LinkAnchor>
        </Ul>
      </Navigation>
      <HamburgerMenu />
    </HeaderWrapper>
  );
};

export default Header;
