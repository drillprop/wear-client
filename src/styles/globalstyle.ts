import { createGlobalStyle } from 'styled-components';
import { black, white } from './colors';

export default createGlobalStyle`

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


  /* To make footer stick in the bottom  */
  
  html, body {
    height: 100%;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
  
  #__next {
    height: 100%;
  }
  



  li {
    list-style-type: none;
  }

  a {
    color: inherit;
    text-decoration: inherit;
  }
`;
