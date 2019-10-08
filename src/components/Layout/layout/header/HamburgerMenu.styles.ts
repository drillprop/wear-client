import styled from 'styled-components';

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

export const HamburgerMenuButton = styled.div`
  z-index: 1;
  position: absolute;
  width: 28px;
  height: 5px;
  background-color: black;
  ::after,
  ::before {
    content: '';
    position: absolute;
    width: 28px;
    height: 5px;
    background-color: black;
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
  margin: 0;
  opacity: 0;
  padding: 0;
  width: 28px;
  z-index: 2;
  height: 28px;
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
