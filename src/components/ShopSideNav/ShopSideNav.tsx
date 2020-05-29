import React from 'react';
import {
  SideNavItem,
  SideNavList,
  SideNavMainTitle,
  SideNavSticky,
  SideNavWrapper,
} from '../../styles/sideNav.styles';
import getGenderCategories from '../../utils/getGenderCategories';
import LinkAnchor from '../LinkAnchor/LinkAnchor';

interface Props {
  gender: string;
}

const ShopSideNav: React.FC<Props> = ({ gender }) => {
  return (
    <SideNavWrapper>
      <SideNavSticky>
        <LinkAnchor href='/[gender]' as={`/${gender.toLowerCase()}`}>
          <SideNavMainTitle>{gender}</SideNavMainTitle>
        </LinkAnchor>
        <SideNavList>
          {getGenderCategories(gender).map((category) => (
            <SideNavItem key={category}>
              <LinkAnchor
                wordToHighlight={category.toLowerCase()}
                href='/[gender]/[category]'
                as={`/${gender.toLowerCase()}/${category.toLowerCase()}`}
              >
                {category}
              </LinkAnchor>
            </SideNavItem>
          ))}
        </SideNavList>
      </SideNavSticky>
    </SideNavWrapper>
  );
};

export default ShopSideNav;
