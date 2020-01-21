import styled from 'styled-components';
import { montserrat, roboto } from '../../../utils/fonts';
import { fontLevel2, fontLevel6 } from '../../../utils/fontSizes';

export const ProfileNav = styled.nav`
  margin-top: 110px;
`;
export const ProfileNavTitle = styled.h1`
  margin: 0;
  font-family: ${roboto};
  font-weight: 500;
  text-decoration: underline;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: ${fontLevel6};
`;
export const ProfileCard = styled.div`
  margin-top: 26px;
  background-color: #f5f5f5;
  padding: 30px;
`;
export const ProfileCardPar = styled.p`
  font-family: ${montserrat};
  font-size: ${fontLevel2};
  margin: 0;
  :last-of-type {
    margin-top: 12px;
  }
`;
export const ProfileNavList = styled.ul`
  margin-top: 60px;
  padding: 0;
`;
export const ProfileNavItem = styled.li`
  font-family: ${roboto};
  margin-top: 12px;
  text-transform: uppercase;
  font-size: ${fontLevel6};
`;
