import styled from 'styled-components';
import { black, gray1, gray2 } from './colors';
import { roboto } from './fonts';
import { fontLevel3, fontLevel5 } from './fontSizes';

export const SideNavWrapper = styled.div`
  position: relative;
`;

export const SideNavSticky = styled.nav`
  @supports (position: sticky) {
    top: 90px;
    position: sticky;
  }
`;

export const SideNavMainTitle = styled.h1`
  font-size: ${fontLevel5};
  font-weight: 700;
  color: ${gray1};
  margin: 0;
  margin-top: 40px;
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
  font-size: ${fontLevel3};
  color: ${gray2};
  :hover {
    color: ${black};
  }
`;
