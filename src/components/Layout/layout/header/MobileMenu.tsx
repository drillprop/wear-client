import React, { useState } from 'react';
import { Gender } from '../../../../generated/types';
import getGenderCategories from '../../../../utils/getGenderCategories';
import {
  HamburgerButton,
  HamburgerButtonSwitch,
  HamburgerButtonWrapper,
  Menu,
} from './MobileMenu.styles';

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
            <li>
              YOUR ACCOUNT
              <ul>
                <li>my profile</li>
                <li>contact details</li>
                <li>orders</li>
              </ul>
            </li>
            <li>YOUR CART</li>
            <li>LOGOUT</li>
            <li>
              WOMAN
              <ul>
                {womanCategories.map((category) => (
                  <li key={category}>{category}</li>
                ))}
              </ul>
            </li>
            <li>
              MAN
              <ul>
                {manCategories.map((category) => (
                  <li key={category}>{category}</li>
                ))}
              </ul>
            </li>
            <li>
              ADMIN PANEL
              <ul>
                <li>users</li>
                <li>items</li>
                <li>user's orders</li>
              </ul>
            </li>
          </ul>
        </Menu>
      )}
    </>
  );
};

export default MobileMenu;
