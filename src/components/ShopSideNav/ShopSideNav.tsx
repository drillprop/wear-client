import React from 'react';
import { Category } from '../../generated/types';
import {
  SideNavItem,
  SideNavList,
  SideNavMainTitle,
  SideNavSticky,
  SideNavWrapper
} from '../../styles/sideNav.styles';

interface Props {
  title?: string;
  categories?: Category[];
}

const ShopSideNav: React.FC<Props> = ({ title, categories }) => {
  return (
    <SideNavWrapper>
      <SideNavSticky>
        <SideNavMainTitle>{title}</SideNavMainTitle>
        <SideNavList>
          {categories?.map(category => (
            <SideNavItem key={category}>{category}</SideNavItem>
          ))}
        </SideNavList>
      </SideNavSticky>
    </SideNavWrapper>
  );
};

export default ShopSideNav;
