import styled from 'styled-components';
import { roboto } from '../../../../styles/fonts';
import fontSizes from '../../../../styles/fontSizes';

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
  font-size: ${fontSizes[1]};
  justify-content: space-between;
  :first-child {
    font-weight: 700;
  }
`;

export const Li = styled.li`
  margin-left: 0px;
  position: relative;
  text-transform: uppercase;
  :last-child {
    margin-left: 22px;
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
