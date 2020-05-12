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
  const [visibleMenus, toggleMenu] = useState({
    account: false,
    man: false,
    woman: false,
    admin: false,
  });
  const { account, man, woman, admin } = visibleMenus;
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
            <li
              onClick={() => toggleMenu({ ...visibleMenus, account: !account })}
            >
              YOUR ACCOUNT
              {account && (
                <ul>
                  <li>my profile</li>
                  <li>contact details</li>
                  <li>orders</li>
                </ul>
              )}
            </li>
            <li>YOUR CART</li>
            <li>LOGOUT</li>
            <li onClick={() => toggleMenu({ ...visibleMenus, woman: !woman })}>
              WOMAN
              {woman && (
                <ul>
                  {womanCategories.map((category) => (
                    <li key={category}>{category}</li>
                  ))}
                </ul>
              )}
            </li>
            <li onClick={() => toggleMenu({ ...visibleMenus, man: !man })}>
              MAN
              {man && (
                <ul>
                  {manCategories.map((category) => (
                    <li key={category}>{category}</li>
                  ))}
                </ul>
              )}
            </li>
            <li onClick={() => toggleMenu({ ...visibleMenus, admin: !admin })}>
              ADMIN PANEL
              {admin && (
                <ul>
                  <li>users</li>
                  <li>items</li>
                  <li>user's orders</li>
                </ul>
              )}
            </li>
          </ul>
        </Menu>
      )}
    </>
  );
};

export default MobileMenu;
