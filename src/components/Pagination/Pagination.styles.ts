import styled from 'styled-components';
import { black, grays } from '../../styles/colors';
import { roboto } from '../../styles/fonts';
import fontSizes from '../../styles/fontSizes';

export const PageNumbersWrapper = styled.div`
  margin: 50px auto 0;
  display: flex;
  justify-content: center;
`;

export const PageNumber = styled.div`
  border-top: 1px solid ${grays[4]};
  border-bottom: 1px solid ${grays[4]};
  display: flex;
  justify-content: center;
  color: ${black};
  font-family: ${roboto};
  font-size: ${fontSizes[1]};
  padding: 10px 30px;
`;

export const NextPrevPage = styled.a`
  user-select: none;
  cursor: pointer;
  font-family: ${roboto};
  font-weight: bold;
  border: 1px solid ${grays[4]};
  font-size: ${fontSizes[1]};
  display: flex;
  justify-content: center;
  padding: 10px 15px;
`;
