import styled from 'styled-components';
import { black, white } from '../../../../styles/colors';

interface HamburgerMenuButtonProps {
  menuActive: boolean;
}

export const HamburgerMenuWrapper = styled.div`
  position: absolute;
  right: 70px;
  display: none;
  align-self: center;
  justify-self: end;
  @media (max-width: 900px) {
    display: block;
  }
`;

export const HamburgerMenuButton = styled.div<HamburgerMenuButtonProps>`
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

export const HamburgerMenuSwitch = styled.input`
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
