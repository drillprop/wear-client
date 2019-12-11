import styled from 'styled-components';

interface SideMenuProps {
  rotate?: number;
  translateX?: number;
}

export const Menu = styled.div`
  position: absolute;
  background-color: black;
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

export const SideMenuLi = styled.div<SideMenuProps>`
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
  color: white;
`;
