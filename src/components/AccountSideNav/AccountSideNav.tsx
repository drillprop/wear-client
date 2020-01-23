import React from 'react';
import LinkAnchor from '../LinkAnchor/LinkAnchor';
import {
  AccountCard,
  AccountCardPar,
  AccountNav,
  AccountNavItem,
  AccountNavList,
  AccountMainTitle
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
          <LinkAnchor href='/profile'>profile</LinkAnchor>
        </AccountNavItem>
        <AccountNavItem>
          <LinkAnchor href='/profile'>contact details</LinkAnchor>
        </AccountNavItem>
        <AccountNavItem>
          <LinkAnchor href='/orders'>orders</LinkAnchor>
        </AccountNavItem>
      </AccountNavList>
    </AccountNav>
  );
};

export default AccountSideNav;
