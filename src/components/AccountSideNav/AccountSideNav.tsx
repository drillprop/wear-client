import React from 'react';
import LinkAnchor from '../LinkAnchor/LinkAnchor';
import {
  AccountCard,
  AccountCardPar,
  AccountMainTitle,
  AccountNav,
  AccountNavItem,
  AccountNavList
} from './AccountSideNav.styles';

interface Props {
  email?: string;
}

const AccountSideNav: React.FC<Props> = ({ email }) => {
  return (
    <AccountNav>
      <AccountMainTitle>{email}</AccountMainTitle>
      <AccountCard>
        <AccountCardPar>Total Orders: 0</AccountCardPar>
        <AccountCardPar>Member since 20/12/2019</AccountCardPar>
      </AccountCard>
      <AccountNavList>
        <AccountNavItem>
          <LinkAnchor highlight href='/profile'>
            profile
          </LinkAnchor>
        </AccountNavItem>
        <AccountNavItem>
          <LinkAnchor highlight href='/contact'>
            contact details
          </LinkAnchor>
        </AccountNavItem>
        <AccountNavItem>
          <LinkAnchor highlight href='/orders'>
            orders
          </LinkAnchor>
        </AccountNavItem>
      </AccountNavList>
    </AccountNav>
  );
};

export default AccountSideNav;
