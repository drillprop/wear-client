import styled from 'styled-components';

interface Props {
  mainColor?: string;
  width?: string;
}

export const StyledButton = styled.button<Props>`
  background: none;
  color: ${({ mainColor = 'black' }) => mainColor};
  outline: 3px solid ${({ mainColor = 'black' }) => mainColor};
  ${props => props.width && `width: ${props.width}`};
  border: none;
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: 700;
  padding: 10px 40px;
  :hover {
    transition: color 150ms, background-color 150ms;
    color: white;
    cursor: pointer;
    background-color: black;
  }
`;
