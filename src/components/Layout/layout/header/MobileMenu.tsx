import React, { useState } from 'react';
import { Gender } from '../../../../generated/types';
import getGenderCategories from '../../../../utils/getGenderCategories';
import {
  HamburgerButton,
  HamburgerButtonSwitch,
  HamburgerButtonWrapper,
  Menu,
} from './MobileMenu.styles';
import ToggleAbleList from '../../../ToggleableList/ToggleableList';
import Link from 'next/link';

const MobileMenu = () => {
  const manCategories = getGenderCategories(Gender.MAN);
  const womanCategories = getGenderCategories(Gender.WOMAN);
  const [menuActive, setMenuActive] = useState(true);

  return (
    <>
      <HamburgerButtonWrapper>
        <HamburgerButtonSwitch
          type='checkbox'
          checked={menuActive}
          onChange={(e) => setMenuActive(e.target.checked)}
        />
        <HamburgerButton menuActive={menuActive} />
      </HamburgerButtonWrapper>
      {menuActive && (
        <Menu>
          <ul>
            <ToggleAbleList title='ACCOUNT'>
              <ul>
                <Link href='/account/profile'>
                  <li>my profile</li>
                </Link>
                <Link href='/account/contact'>
                  <li>contact details</li>
                </Link>
                <Link href='/account/orders'>
                  <li>orders</li>
                </Link>
              </ul>
            </ToggleAbleList>
            <Link href='/cart'>
              <li>YOUR CART</li>
            </Link>
            <li>LOGOUT</li>
            <ToggleAbleList title='WOMAN'>
              <ul>
                {womanCategories.map((category) => (
                  <Link
                    key={category}
                    href='/shop/[gender]/[category]'
                    as={`/shop/woman/${category.toLowerCase()}`}
                  >
                    <li>{category}</li>
                  </Link>
                ))}
              </ul>
            </ToggleAbleList>
            <ToggleAbleList title='MAN'>
              <ul>
                {manCategories.map((category) => (
                  <Link
                    key={category}
                    href='/shop/[gender]/[category]'
                    as={`/shop/man/${category.toLowerCase()}`}
                  >
                    <li>{category}</li>
                  </Link>
                ))}
              </ul>
            </ToggleAbleList>
            <ToggleAbleList title='ADMIN PANEL'>
              <ul>
                <Link href='/admin/users'>
                  <li>users</li>
                </Link>
                <Link href='/admin/items'>
                  <li>items</li>
                </Link>
                <Link href='/admin/orders'>
                  <li>user's orders</li>
                </Link>
              </ul>
            </ToggleAbleList>
          </ul>
        </Menu>
      )}
    </>
  );
};

export default MobileMenu;
