import React from 'react';
import { Category } from '../../generated/types';
import {
  SideNavWrapper,
  SideNavSticky,
  SideNavMainTitle,
  SideNavList
} from '../../styles/sideNav.styles';
import {
  CategoryList,
  CategoryItem,
  SideNavGender
} from './ShopSideNav.styles';

const ShopSideNav = () => {
  const womanCategories = Object.values(Category);
  const manCategories = Object.values(Category).filter(
    cat => cat !== Category.Dress && cat !== Category.Blouse
  );
  return (
    <SideNavWrapper>
      <SideNavSticky>
        <SideNavMainTitle>Shop</SideNavMainTitle>
        <SideNavList>
          <SideNavGender>
            Woman
            <CategoryList>
              {womanCategories.map(category => (
                <CategoryItem key={category}>{category} </CategoryItem>
              ))}
            </CategoryList>
          </SideNavGender>
          <SideNavGender>
            Man
            <CategoryList>
              {manCategories.map(category => (
                <CategoryItem key={category}>{category} </CategoryItem>
              ))}
            </CategoryList>
          </SideNavGender>
        </SideNavList>
      </SideNavSticky>
    </SideNavWrapper>
  );
};

export default ShopSideNav;
