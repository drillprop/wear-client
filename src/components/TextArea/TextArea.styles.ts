import styled from 'styled-components';
import { roboto, montserrat } from '../../styles/fonts';
import fontSizes from '../../styles/fontSizes';
import { grays } from '../../styles/colors';

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
  font-size: ${fontSizes[1]};
  margin-bottom: 5px;
  color: ${grays[0]};
  display: block;
  cursor: pointer;
  text-transform: uppercase;
`;

export const StyledTextArea = styled.textarea`
  padding: 10px 0 0 10px;
  width: 100%;
  margin: 0;
  border: 2px solid ${grays[0]};
  width: 100%;
  height: 90px;
  font-family: ${montserrat};
  font-size: ${fontSizes[1]};
`;
