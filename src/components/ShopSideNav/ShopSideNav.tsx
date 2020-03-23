import { useRouter } from 'next/router';
import React from 'react';
import { Gender } from '../../generated/types';
import {
  SideNavItem,
  SideNavList,
  SideNavMainTitle,
  SideNavSticky,
  SideNavWrapper
} from '../../styles/sideNav.styles';
import getGenderCategories from '../../utils/getGenderCategories';
import LinkAnchor from '../LinkAnchor/LinkAnchor';

interface Props {
  gender: Gender;
}

const ShopSideNav: React.FC<Props> = ({ gender }) => {
  return (
    <SideNavWrapper>
      <SideNavSticky>
        <LinkAnchor href='/shop/[gender]' as={`/shop/${gender.toLowerCase()}`}>
          <SideNavMainTitle>{gender}</SideNavMainTitle>
        </LinkAnchor>
        <SideNavList>
          {getGenderCategories(gender).map(category => (
            <SideNavItem key={category}>
              <LinkAnchor
                wordToHighlight={category.toLowerCase()}
                href='/shop/[gender]/[category]'
                as={`/shop/${gender.toLowerCase()}/${category.toLowerCase()}`}
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
