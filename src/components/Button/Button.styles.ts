import styled from 'styled-components';

export const StyledButton = styled.button`
  display: block;
  background: none;
  font-family: 'Montserrat', sans-serif;
  width: 100%;
  font-size: 15px;
  font-weight: 700;
  border: none;
  outline: 3px solid black;
  padding: 10px 40px;
  :hover {
    transition: color 150ms, background-color 150ms;
    color: white;
    cursor: pointer;
    background-color: black;
  }
`;
