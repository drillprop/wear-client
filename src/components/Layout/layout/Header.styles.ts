import styled from 'styled-components';
import { roboto, montserrat } from '../../../utils/fonts';
import { fontLevel10, fontLevel1 } from '../../../utils/fontSizes';

export const HeaderWrapper = styled.header`
  background-color: white;
  border-bottom: 1px;
  display: grid;
  position: fixed;
  z-index: 2;
  width: 100%;
  top: 0;
  grid-template-columns: repeat(2, 1fr);
`;

export const Logo = styled.div`
  font-family: ${roboto};
  line-height: 1.5;
  text-decoration: none;
  color: black;
  font-weight: 700;
  margin: 0;
  margin-left: 50px;
  font-size: ${fontLevel10};
  font-style: italic;
`;

export const Navigation = styled.nav`
  display: flex;
  align-self: center;
  justify-content: space-between;
  padding: 20px;
  @media (max-width: 900px) {
    display: none;
  }
`;

export const Ul = styled.ul`
  font-family: ${montserrat};
  padding: 0;
  margin: 0;
  letter-spacing: 2px;
  display: flex;
  font-size: ${fontLevel1};
  justify-content: space-between;
  :first-child {
    font-weight: 700;
  }
`;

export const Li = styled.li`
  margin-right: 25px;
  text-transform: uppercase;
  img {
    width: 12px;
    height: 12px;
    top: 0.125em;
    margin-right: 10px;
    position: relative;
  }
`;
