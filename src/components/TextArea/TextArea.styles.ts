import styled from 'styled-components';
import { roboto, montserrat } from '../../styles/fonts';
import { fontLevel2 } from '../../styles/fontSizes';
import { gray1 } from '../../styles/colors';

interface TextAreaWrapperProps {
  marginTop: string;
  width: string;
}

export const TextAreaWrapper = styled.div<TextAreaWrapperProps>`
  margin-top: ${props => props.marginTop};
  width: ${props => props.width};
`;

export const TextAreaLabel = styled.label`
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

export const StyledTextArea = styled.textarea`
  padding: 10px 0 0 10px;
  width: 100%;
  margin: 0;
  border: 2px solid ${gray1};
  width: 100%;
  height: 90px;
  font-family: ${montserrat};
  font-size: ${fontLevel2};
`;
