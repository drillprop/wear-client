import styled from 'styled-components';
import { montserrat } from '../../styles/fonts';
import { fontLevel2 } from '../../styles/fontSizes';

interface Props {
  mainColor?: string;
  marginTop: string;
}

export const StyledButton = styled.button<Props>`
  position: relative;
  cursor: pointer;
  font-family: ${montserrat};
  background: none;
  color: ${({ mainColor = 'black' }) => mainColor};
  border: 3px solid ${({ mainColor = 'black' }) => mainColor};
  ${props => props.marginTop && `margin-top: ${props.marginTop}`};
  font-size: ${fontLevel2};
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
