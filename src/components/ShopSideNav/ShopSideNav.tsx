import React from 'react';
import { Category, Gender } from '../../generated/types';
import {
  SideNavItem,
  SideNavList,
  SideNavMainTitle,
  SideNavSticky,
  SideNavWrapper
} from '../../styles/sideNav.styles';
import LinkAnchor from '../LinkAnchor/LinkAnchor';
import getGenderCategories from '../../utils/getGenderCategories';

interface Props {
  gender: Gender;
}

const ShopSideNav: React.FC<Props> = ({ gender }) => {
  return (
    <SideNavWrapper>
      <SideNavSticky>
        <SideNavMainTitle>{gender}</SideNavMainTitle>
        <SideNavList>
          {getGenderCategories(gender).map(category => (
            <LinkAnchor
              key={category}
              href={{
                pathname: `${gender.toLowerCase()}`,
                query: {
                  category: category.toLowerCase()
                }
              }}
            >
              <SideNavItem>{category}</SideNavItem>
            </LinkAnchor>
          ))}
        </SideNavList>
      </SideNavSticky>
    </SideNavWrapper>
  );
};

export default ShopSideNav;
