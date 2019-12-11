import React from 'react';
import { Menu, SideMenuLi } from './SideMenu.styles';

const NavigationMenu = () => {
  return (
    <Menu>
      <ul>
        <SideMenuLi>FOR MEN</SideMenuLi>
        <SideMenuLi>FOR WOMEN</SideMenuLi>
      </ul>
      <ul>
        <SideMenuLi>YOUR ACCOUNT</SideMenuLi>
        <SideMenuLi> YOUR CART</SideMenuLi>
      </ul>
    </Menu>
  );
};

export default NavigationMenu;
