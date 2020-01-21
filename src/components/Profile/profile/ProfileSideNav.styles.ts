import styled from 'styled-components';
import { montserrat, roboto } from '../../../utils/fonts';
import { fontLevel2, fontLevel6 } from '../../../utils/fontSizes';

export const ProfileNav = styled.nav`
  top: 0;
  margin-top: 110px;
`;
export const ProfileNavTitle = styled.h1`
  font-family: ${roboto};
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: ${fontLevel6};
`;
export const ProfileCard = styled.div`
  background-color: #f5f5f5;
  width: 90%;
  padding: 20px;
`;
export const ProfileCardPar = styled.p`
  font-family: ${montserrat};
  font-size: ${fontLevel2};
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
