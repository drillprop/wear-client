import React from 'react';
import {
  HamburgerMenuWrapper,
  HamburgerMenuButton,
  HamburgerMenuSwitch
} from './HamburgerMenu.styles';

const HamburgerMenu = () => {
  return (
    <HamburgerMenuWrapper>
      <HamburgerMenuSwitch type='checkbox' />
      <HamburgerMenuButton />
    </HamburgerMenuWrapper>
  );
};

export default HamburgerMenu;
