import styled from 'styled-components';
import { gray3 } from './colors';
import { roboto } from './fonts';
import { fontLevel3 } from './fontSizes';

export const SideNavWrapper = styled.div`
  position: relative;
`;

export const SideNavSticky = styled.nav`
  padding-right: 20px;
  @supports (position: sticky) {
    position: sticky;
    top: 210px;
  }
`;

export const SideNavMainTitle = styled.h1`
  font-size: ${fontLevel3};
  font-weight: 700;
  color: ${gray3};
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
  margin-top: 18px;
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 2px;
  font-size: ${fontLevel3};
`;
