import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'NanumSquare', sans-serif;
    font-display:'block';
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html,
  body {
    /* font-family: 'Roboto', sans-serif; */
    height: 100%;
    font-size: 10px;
    background-color: #303537;
  }

  #__next {
    height: 100%;
  }
`;

export default GlobalStyles;
