import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:500,600,700|Roboto+Condensed:700i&display=swap');

  body {
    margin: 0;
    padding:0;
    font-family: 'Montserrat', sans-serif;
  }

  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  li {
    list-style-type: none;
  }
`;
