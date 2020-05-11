import React, { useState } from 'react';
import {
  HamburgerButton,
  HamburgerButtonSwitch,
  HamburgerButtonWrapper,
  Menu,
  MobileNavItem,
} from './MobileMenu.styles';

const HamburgerMenu = () => {
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
            <MobileNavItem>YOUR ACCOUNT</MobileNavItem>
            <MobileNavItem>YOUR CART</MobileNavItem>
            <MobileNavItem>FOR MEN</MobileNavItem>
            <MobileNavItem>FOR WOMEN</MobileNavItem>
          </ul>
        </Menu>
      )}
    </>
  );
};

export default HamburgerMenu;
