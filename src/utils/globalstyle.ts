import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:500,600,700|Roboto+Condensed:700,700i&display=swap');

  body {
    margin: 0;
    padding:0;
    font-family: 'Montserrat', sans-serif;
  }

  * {
    box-sizing: border-box;
  }

  /* To make footer stick in the bottom  */
  html, body {
    height: 100%;
  }
  
  #__next {
    height: 100%;
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }

  h1, h2, h3, h4, h5, h6, p, span {
    line-height: 1;
  }

  li {
    list-style-type: none;
  }
  a {
    color: inherit;
    text-decoration: inherit;
  }
`;
