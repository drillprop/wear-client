import styled from 'styled-components';
import { roboto } from '../../styles/fonts';
import { fontLevel2 } from '../../styles/fontSizes';
import { black } from '../../styles/colors';

export const PageNumbersWrapper = styled.div`
  margin: 50px auto 0;
  display: flex;
  justify-content: center;
`;

export const PageNumber = styled.div`
  border-top: 1px solid ${black};
  border-bottom: 1px solid ${black};
  display: flex;
  justify-content: center;
  color: ${black};
  font-family: ${roboto};
  font-size: ${fontLevel2};
  padding: 10px 30px;
`;

export const NextPrevPage = styled.div`
  cursor: pointer;
  font-family: ${roboto};
  font-weight: bold;
  border: 1px solid ${black};
  font-size: ${fontLevel2};
  display: flex;
  justify-content: center;
  padding: 10px 15px;
`;
