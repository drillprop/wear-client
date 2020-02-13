import React from 'react';
import {
  SideNavItem,
  SideNavList,
  SideNavMainTitle,
  SideNavWrapper,
  SideNavSticky
} from '../../styles/sideNav.styles';
import LinkAnchor from '../LinkAnchor/LinkAnchor';

const AdminSideNav: React.FC = () => {
  return (
    <SideNavWrapper>
      <SideNavSticky>
        <SideNavMainTitle>ADMIN PANEL</SideNavMainTitle>
        <SideNavList>
          <SideNavItem>
            <LinkAnchor highlight href='/admin/users'>
              users
            </LinkAnchor>
          </SideNavItem>
          <SideNavItem>
            <LinkAnchor highlight href='/admin/items'>
              items
            </LinkAnchor>
          </SideNavItem>
          <SideNavItem>
            <LinkAnchor highlight href='/admin/orders'>
              user's orders
            </LinkAnchor>
          </SideNavItem>
        </SideNavList>
      </SideNavSticky>
    </SideNavWrapper>
  );
};

export default AdminSideNav;
