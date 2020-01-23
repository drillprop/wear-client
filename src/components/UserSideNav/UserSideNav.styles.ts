import styled from 'styled-components';
import { montserrat, roboto } from '../../styles/fonts';
import { fontLevel2, fontLevel6 } from '../../styles/fontSizes';

export const UserNav = styled.nav``;

export const UserMainTitle = styled.h1`
  font-size: ${fontLevel6};
  margin: 0;
  margin-top: 18px;
  font-family: ${roboto};
  text-transform: uppercase;
  letter-spacing: 2px;
`;
export const UserCard = styled.div`
  margin-top: 26px;
  background-color: #f5f5f5;
  padding: 30px;
`;
export const UserCardPar = styled.p`
  font-family: ${montserrat};
  font-size: ${fontLevel2};
  margin: 0;
  :last-of-type {
    margin-top: 12px;
  }
`;
export const UserNavList = styled.ul`
  margin-top: 60px;
  padding: 0;
`;
export const UserNavItem = styled.li`
  font-family: ${roboto};
  margin-top: 12px;
  text-transform: uppercase;
  font-size: ${fontLevel6};
`;
