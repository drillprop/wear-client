import styled from 'styled-components';

export const StyledHeroButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  cursor: pointer;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 25px;
  background-color: white;
  border: none;
  border-radius: 100%;
  outline: none;
  width: 7em;
  height: 7em;
  transform: translate(-50%, -50%);
  transition: transform 100ms, background-color 100ms;
  :hover {
    background-color: black;
    color: white;
    transform: translate(-50%, -50%) scale(1.1);
    transition: transform 200ms, background-color 200ms;
  }
  @media (max-width: 900px) {
    font-size: 18px;
    position: static;
    width: 100%;
    margin: 0 auto;
    border-radius: 0;
    height: auto;
    margin-top: 10px;
    padding: 10px;
    transform: none;
    :hover {
      background-color: inherit;
      color: inherit;
      transform: none;
    }
  }
`;
