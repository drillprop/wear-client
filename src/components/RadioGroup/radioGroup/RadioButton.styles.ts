import styled, { css } from 'styled-components';
import { black, grays } from '../../../styles/colors';
import { montserrat } from '../../../styles/fonts';
import { fontLevel2 } from '../../../styles/fontSizes';

const sharedCSS = css`
  position: absolute;
  margin: 0;
  height: 14px;
  width: 14px;
`;

export const RadioButtonWrapper = styled.div`
  position: relative;
  margin-left: 10px;
  height: 44px;
  display: flex;
  align-items: center;
`;

export const RadioLabel = styled.label`
  margin-left: 25px;
  font-family: ${montserrat};
  font-size: ${fontLevel2};
  color: rgb(117, 117, 117);
  cursor: pointer;
  text-transform: uppercase;
`;

export const StyledRadioInput = styled.input`
  cursor: pointer;
  ${sharedCSS}
  z-index: 2;
  opacity: 0;
  padding: 0;
  margin: 0;
  :focus ~ span {
    outline: -webkit-focus-ring-color auto 1px;
  }
  :checked ~ span::after,
  :checked ~ span::before {
    opacity: 1;
  }
  :checked ~ label {
    color: ${black};
  }
`;

export const CustomRadioButton = styled.span`
  cursor: pointer;
  ${sharedCSS}
  border-radius: 100%;
  border: 2px solid ${grays[1]};
  display: flex;
  align-items: center;
  justify-content: center;
  ::after {
    opacity: 0;
    content: '';
    border-radius: 100%;
    position: absolute;
    width: 6px;
    height: 6px;
    background-color: ${grays[2]};
    transition: opacity 400ms;
  }
`;
