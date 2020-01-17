import styled from 'styled-components';
import { fontLevel3 } from '../../utils/fontSizes';
import { montserrat } from '../../utils/fonts';

interface Props {
  mainColor?: string;
  width?: string;
}

export const StyledButton = styled.button<Props>`
  position: relative;
  cursor: pointer;
  font-family: ${montserrat};
  background: none;
  color: ${({ mainColor = 'black' }) => mainColor};
  outline: 3px solid ${({ mainColor = 'black' }) => mainColor};
  ${props => props.width && `width: ${props.width}`};
  border: none;
  font-size: ${fontLevel3};
  font-weight: 700;
  padding: 10px 40px;
  transition: color 150ms;
  :hover {
    color: white;
  }
  ::after {
    transform: scaleX(0);
    transform-origin: right;
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: black;
    transition: transform 300ms;
  }
  :hover ::after {
    transform: scaleX(1);
    z-index: -1;
    transform-origin: left;
    color: white;
    cursor: pointer;
  }
`;
