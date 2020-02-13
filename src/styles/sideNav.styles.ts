import styled from 'styled-components';
import { fontLevel6 } from './fontSizes';
import { roboto } from './fonts';

export const SideNavWrapper = styled.div`
  position: relative;
`;

export const SideNavSticky = styled.nav`
  @supports (position: sticky) {
    position: sticky;
    top: 120px;
  }
`;

export const SideNavMainTitle = styled.h1`
  font-size: ${fontLevel6};
  margin: 0;
  margin-top: 18px;
  font-family: ${roboto};
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const SideNavList = styled.ul`
  margin-top: 60px;
  padding: 0;
`;

export const SideNavItem = styled.li`
  font-family: ${roboto};
  margin-top: 12px;
  text-transform: uppercase;
  font-size: ${fontLevel6};
`;
