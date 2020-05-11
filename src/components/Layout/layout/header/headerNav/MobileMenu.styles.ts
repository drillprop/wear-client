import styled from 'styled-components';
import { black, white } from '../../../../../styles/colors';

interface HamburgerMenuButtonProps {
  menuActive: boolean;
}

export const HamburgerButtonWrapper = styled.div`
  position: absolute;
  right: 70px;
  display: none;
  align-self: center;
  justify-self: end;
  @media (max-width: 900px) {
    display: block;
  }
`;

export const HamburgerButton = styled.div<HamburgerMenuButtonProps>`
  z-index: 1;
  position: absolute;
  width: 28px;
  height: 5px;
  background-color: ${({ menuActive }) => (menuActive ? white : black)};
  ::after,
  ::before {
    content: '';
    position: absolute;
    width: 28px;
    height: 5px;
    background-color: ${({ menuActive }) => (menuActive ? white : black)};
  }
  ::before {
    top: -10px;
  }
  ::after {
    top: 10px;
  }
`;

export const HamburgerButtonSwitch = styled.input`
  cursor: pointer;
  position: absolute;
  top: -10px;
  margin: 0;
  opacity: 0;
  padding: 0;
  width: 29px;
  height: 29px;
  z-index: 2;
  background: none;
  :checked + div {
    transform: rotate(45deg);
  }
  :checked + div:before {
    transform: translateY(10px) rotate(90deg);
  }
  :checked + div::after {
    transform: translateY(-10px) rotate(90deg);
  }
`;

interface MobileNavItemProps {
  rotate?: number;
  translateX?: number;
}

export const Menu = styled.div`
  position: absolute;
  background-color: ${black};
  width: 100vw;
  height: 100vh;
  display: flex;
  nav {
    margin: 0;
    padding: 0;
    ul {
      position: absolute;
      margin: 0;
    }
  }
`;

export const MobileNavItem = styled.div<MobileNavItemProps>`
  font-size: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 100%;
  text-align: left;
  text-transform: uppercase;
  transform: ${({ rotate, translateX }) =>
    `rotate(${rotate}deg) translateX(${translateX}px)`};
  margin: 0;
  margin-left: 10px;
  color: ${white};
`;
