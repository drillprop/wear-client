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
            <LinkAnchor wordToHighlight='profile' href='/account/profile'>
              profile
            </LinkAnchor>
          </SideNavItem>
          <SideNavItem>
            <LinkAnchor wordToHighlight='contact' href='/account/contact'>
              contact details
            </LinkAnchor>
          </SideNavItem>
          <SideNavItem>
            <LinkAnchor wordToHighlight='orders' href='/account/orders'>
              orders
            </LinkAnchor>
          </SideNavItem>
        </SideNavList>
      </SideNavSticky>
    </SideNavWrapper>
  );
};

export default AccountSideNav;
