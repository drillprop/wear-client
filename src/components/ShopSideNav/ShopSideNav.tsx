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
import { useRouter } from 'next/router';

interface Props {
  gender: Gender;
}

const ShopSideNav: React.FC<Props> = ({ gender }) => {
  const { query } = useRouter();
  return (
    <SideNavWrapper>
      <SideNavSticky>
        <SideNavMainTitle>
          <LinkAnchor href={gender.toLowerCase()}>{gender}</LinkAnchor>
        </SideNavMainTitle>
        <SideNavList>
          {getGenderCategories(gender).map(category => (
            <SideNavItem key={category}>
              <LinkAnchor
                queryHighlight={query.category === category.toLowerCase()}
                href={{
                  pathname: `/${gender.toLowerCase()}`,
                  query: {
                    category: category.toLowerCase()
                  }
                }}
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
