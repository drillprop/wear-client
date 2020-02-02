import styled, { css } from 'styled-components';
import { roboto, montserrat } from '../../styles/fonts';
import { fontLevel2 } from '../../styles/fontSizes';
import { gray1, black, white } from '../../styles/colors';

interface InputWrapperProps {
  marginTop: string;
  width: string;
}

const sharedCSS = css`
  position: absolute;
  margin: 0;
  width: 100%;
  height: 44px;
`;

export const FileInputWrapper = styled.div<InputWrapperProps>`
  position: relative;
  margin-top: ${props => props.marginTop};
  width: ${props => props.width};
  height: 61px;
`;
export const FileInputLabel = styled.label`
  position: relative;
  font-family: ${roboto};
  font-weight: 700;
  font-size: ${fontLevel2};
  margin-bottom: 5px;
  color: ${gray1};
  display: block;
  cursor: pointer;
  text-transform: uppercase;
`;
export const StyledFileInput = styled.input`
  ${sharedCSS}
  cursor: pointer;
  z-index: 3;
  opacity: 0;
`;

export const CustomFileInput = styled.button`
  ${sharedCSS}
  font-family: ${montserrat};
  border: none;
  color: ${white};
  background-color: ${black};

`;
