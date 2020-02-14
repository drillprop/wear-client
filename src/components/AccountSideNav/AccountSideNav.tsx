import React from 'react';
import {
  SideNavItem,
  SideNavList,
  SideNavMainTitle,
  SideNavSticky,
  SideNavWrapper
} from '../../styles/sideNav.styles';
import LinkAnchor from '../LinkAnchor/LinkAnchor';

interface Props {
  email?: string;
}

const AccountSideNav: React.FC<Props> = ({ email }) => {
  return (
    <SideNavWrapper>
      <SideNavSticky>
        <SideNavMainTitle>{email}</SideNavMainTitle>
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
      </SideNavSticky>
    </SideNavWrapper>
  );
};

export default AccountSideNav;
