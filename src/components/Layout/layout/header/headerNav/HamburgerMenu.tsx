import React, { useState } from 'react';
import {
  HamburgerMenuWrapper,
  HamburgerMenuButton,
  HamburgerMenuSwitch
} from './HamburgerMenu.styles';
import NavigationMenu from './hamburgermenu/SideMenu';

const HamburgerMenu = () => {
  const [menuActive, setMenuActive] = useState(false);
  return (
    <>
      <HamburgerMenuWrapper>
        <HamburgerMenuSwitch
          type='checkbox'
          checked={menuActive}
          onChange={e => setMenuActive(e.target.checked)}
        />
        <HamburgerMenuButton menuActive={menuActive} />
      </HamburgerMenuWrapper>
      {menuActive && <NavigationMenu />}
    </>
  );
};

export default HamburgerMenu;
