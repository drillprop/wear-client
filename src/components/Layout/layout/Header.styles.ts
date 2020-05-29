import styled from 'styled-components';
import { roboto } from '../../../styles/fonts';
import fontSizes from '../../../styles/fontSizes';
import { black, white } from '../../../styles/colors';

export const HeaderWrapper = styled.header`
  padding: 0 50px;
  background-color: ${white};
  border-bottom: 1px;
  position: fixed;
  z-index: 2;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  top: 0;
  display: grid;
  grid-template-columns: 200px 1fr;
  left: 50%;
  transform: translateX(-50%);
  @media (max-width: 500px) {
    padding: 0 25px;
  }
`;

export const Logo = styled.h1`
  font-family: ${roboto};
  line-height: 1.5;
  text-decoration: none;
  color: ${black};
  font-weight: 700;
  margin: 0;
  font-size: ${fontSizes[9]};
  font-style: italic;
`;

export const Navigation = styled.nav`
  display: flex;
  align-self: center;
  justify-content: space-between;
`;

export const Ul = styled.ul`
  flex-grow: 1;
  font-family: ${roboto};
  padding: 0;
  margin: 0;
  letter-spacing: 1px;
  display: flex;
  font-size: ${fontSizes[1]};
  justify-content: flex-end;
  :first-of-type {
    justify-content: center;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

export const Li = styled.li`
  margin-left: 0px;
  position: relative;
  text-transform: uppercase;
  :last-child {
    margin-left: 40px;
  }
  .icon,
  svg {
    width: 14px;
    height: 14px;
    top: 0.125em;
    margin-right: 10px;
    position: relative;
  }
`;
