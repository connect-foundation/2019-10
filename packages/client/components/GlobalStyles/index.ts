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
    user-select : none;
  }

  #__next {
    height: 100%;
  }

  .MuiSkeleton-root {
    background-color: rgba(255, 255, 255, 0.08) !important;
  }

  .MuiSkeleton-text:empty:before {
    content: "" !important;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyles;
