import React from 'react';
import {
  SideNavItem,
  SideNavList,
  SideNavMainTitle
} from '../../styles/sharedStyles';
import LinkAnchor from '../LinkAnchor/LinkAnchor';
import { AccountCard, AccountCardPar } from './AccountSideNav.styles';

interface Props {
  email?: string;
}

const AccountSideNav: React.FC<Props> = ({ email }) => {
  return (
    <nav>
      <SideNavMainTitle>{email}</SideNavMainTitle>
      <AccountCard>
        <AccountCardPar>Total Orders: 0</AccountCardPar>
        <AccountCardPar>Member since 20/12/2019</AccountCardPar>
      </AccountCard>
      <SideNavList>
        <SideNavItem>
          <LinkAnchor highlight href='/account/profile'>
            profile
          </LinkAnchor>
        </SideNavItem>
        <SideNavItem>
          <LinkAnchor highlight href='/account/contact'>
            contact details
          </LinkAnchor>
        </SideNavItem>
        <SideNavItem>
          <LinkAnchor highlight href='/account/orders'>
            orders
          </LinkAnchor>
        </SideNavItem>
      </SideNavList>
    </nav>
  );
};

export default AccountSideNav;
