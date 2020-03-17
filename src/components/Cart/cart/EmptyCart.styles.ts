import styled from 'styled-components';
import { roboto } from '../../../styles/fonts';
import fontSizes from '../../../styles/fontSizes';
import { grays } from '../../../styles/colors';

export const StyledEmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  h1 {
    margin: 0;
    text-align: center;
    font-family: ${roboto};
    text-transform: uppercase;
    font-size: ${fontSizes[7]};
  }
  h3 {
    max-width: 400px;
    line-height: 2;
    margin: 0;
    text-align: center;
    margin-top: 30px;
    color: ${grays[2]};
    font-size: ${fontSizes[3]};
  }
`;
