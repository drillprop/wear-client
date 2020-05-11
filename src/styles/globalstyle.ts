import { createGlobalStyle } from 'styled-components';
import { black, white } from './colors';

export default createGlobalStyle`
  
  html, body {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
  

  body {
    margin: 0;
    padding:0;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    color: ${black};
    background-color: ${white};
  }

  input {
    background-color: ${white};
  }

  li {
    list-style-type: none;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }
`;
