import styled from 'styled-components';
import { black, grays } from './colors';
import { roboto } from './fonts';
import fontSizes from './fontSizes';

export const SideNavWrapper = styled.div`
  position: relative;
`;

export const SideNavSticky = styled.nav`
  @supports (position: sticky) {
    top: 140px;
    position: sticky;
  }
`;

export const SideNavMainTitle = styled.h1`
  font-size: ${fontSizes[3]};
  font-weight: 700;
  color: ${grays[0]};
  margin: 0;
  font-family: ${roboto};
  text-transform: uppercase;
`;

export const SideNavList = styled.ul`
  margin-top: 30px;
  padding: 0;
`;

export const SideNavItem = styled.li`
  font-family: ${roboto};
  margin-top: 14px;
  text-transform: uppercase;
  font-weight: 400;
  font-size: ${fontSizes[2]};
  color: ${grays[1]};
  :hover {
    color: ${black};
  }
`;
