import styled from 'styled-components';
import { roboto } from '../../utils/fonts';
import { fontLevel4 } from '../../utils/fontSizes';

export const StyledSwitchSignButton = styled.button`
  position: fixed;
  padding: 0;
  top: 50%;
  left: 50%;
  cursor: pointer;
  font-family: ${roboto};
  font-size: ${fontLevel4};
  background-color: white;
  border: none;
  border-radius: 100%;
  outline: none;
  width: 130px;
  height: 130px;
  transform: translate(-50%, -50%);
  transition: transform 100ms, background-color 200ms;
  :hover {
    background-color: black;
    color: white;
    transform: translate(-50%, -50%) scale(1.1);
    transition: transform 200ms, background-color 200ms;
  }
  @media (max-width: 900px) {
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
