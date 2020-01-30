import styled from 'styled-components';
import { montserrat } from '../../styles/fonts';
import { fontLevel2 } from '../../styles/fontSizes';

export const AccountCard = styled.div`
  margin-top: 50px;
`;
export const AccountCardPar = styled.p`
  font-family: ${montserrat};
  font-size: ${fontLevel2};
  margin: 0;
  :last-of-type {
    margin-top: 12px;
  }
`;
