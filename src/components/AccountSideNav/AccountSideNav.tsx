import React from 'react';
import {
  SideNavItem,
  SideNavList,
  SideNavMainTitle,
  SideNavSticky,
  SideNavWrapper
} from '../../styles/sideNav.styles';
import LinkAnchor from '../LinkAnchor/LinkAnchor';

const AccountSideNav: React.FC = () => {
  return (
    <SideNavWrapper>
      <SideNavSticky>
        <SideNavMainTitle>account</SideNavMainTitle>
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
