import styled from 'styled-components';
import { black, white, grays } from '../../../../styles/colors';
import { roboto } from '../../../../styles/fonts';

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

export const Menu = styled.div`
  overflow-y: auto;
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${black};
  width: 290px;
  height: 100vh;
  display: none;
  @media (max-width: 900px) {
    display: block;
  }
  ul {
    padding: 0;
    margin: 100px auto;
    li {
      cursor: pointer;
      margin: 30px 80px 0 auto;
      text-align: right;
      font-size: 20px;
      text-transform: uppercase;
      color: ${white};
      ul {
        margin: 0;
        li {
          font-family: ${roboto};
          margin: 14px 0 0;
          color: ${grays[5]};
          font-size: 16px;
          text-align: right;
        }
      }
    }
  }
`;
