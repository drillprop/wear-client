import React, { useState } from 'react';
import {
  HamburgerButton,
  HamburgerButtonSwitch,
  HamburgerButtonWrapper,
  Menu,
} from './MobileMenu.styles';

const MobileMenu = () => {
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
            <li>YOUR ACCOUNT</li>
            <li>YOUR CART</li>
            <li>FOR MEN</li>
            <li>FOR WOMEN</li>
          </ul>
        </Menu>
      )}
    </>
  );
};

export default MobileMenu;
