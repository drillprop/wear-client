import styled from 'styled-components';
import { grays, white } from '../../../styles/colors';
import { roboto } from '../../../styles/fonts';
import fontSizes from '../../../styles/fontSizes';

export const SizesInputsWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  margin-top: 34px;
  width: 100%;
  border: 2px solid ${grays[0]};
  display: grid;
  padding: 30px 25px;
  grid-gap: 20px;
  justify-content: center;
  grid-template-columns: repeat(2, 90px);
  ::before {
    position: absolute;
    top: -8px;
    left: 5px;
    content: 'available sizes';
    background-color: ${white};
    padding: 0;
    padding-right: 5px;
    padding-left: 5px;
    font-family: ${roboto};
    font-weight: 700;
    font-size: ${fontSizes[1]};
    color: ${grays[0]};
    text-transform: uppercase;
  }
`;
