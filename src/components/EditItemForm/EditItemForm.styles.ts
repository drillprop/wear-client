import styled from 'styled-components';
import { grays, white } from '../../styles/colors';
import { roboto } from '../../styles/fonts';
import fontSizes from '../../styles/fontSizes';

export const StyledEditForm = styled.form`
  display: grid;
  grid-template-rows: repeat(1, 1fr);
`;

export const EditItemWrapper = styled.div`
  margin-top: 0;
  display: grid;
  grid-gap: 0px 100px;
  grid-template-columns: repeat(auto-fill, minmax(auto, 350px));
  grid-template-rows: repeat(2, auto);
`;

export const SizesInputsWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  margin-top: 34px;
  width: 100%;
  border: 2px solid ${grays[0]};
  display: grid;
  padding: 30px 25px;
  grid-gap: 15px;
  justify-items: center;
  grid-template-columns: repeat(2, 1fr);
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
