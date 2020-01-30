import styled from 'styled-components';
import { roboto } from '../../../styles/fonts';
import { fontLevel10, fontLevel2 } from '../../../styles/fontSizes';
import { black, white } from '../../../styles/colors';

export const HeaderWrapper = styled.header`
  padding: 0 50px;
  background-color: ${white};
  border-bottom: 1px;
  position: fixed;
  z-index: 2;
  width: 100%;
  top: 0;
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-gap: 90px;
`;

export const Logo = styled.div`
  font-family: ${roboto};
  line-height: 1.5;
  text-decoration: none;
  color: ${black};
  font-weight: 700;
  margin: 0;
  font-size: ${fontLevel10};
  font-style: italic;
`;

export const Navigation = styled.nav`
  display: flex;
  align-self: center;
  justify-content: space-between;
  @media (max-width: 900px) {
    display: none;
  }
`;

export const Ul = styled.ul`
  font-family: ${roboto};
  padding: 0;
  margin: 0;
  font-weight: 400;
  letter-spacing: 2px;
  display: flex;
  font-size: ${fontLevel2};
  justify-content: space-between;
  :first-child {
    font-weight: 700;
  }
`;

export const Li = styled.li`
  margin-left: 0px;
  text-transform: uppercase;
  :last-child {
    margin-left: 22px;
  }
  img {
    width: 12px;
    height: 12px;
    top: 0.125em;
    margin-right: 10px;
    position: relative;
  }
`;
