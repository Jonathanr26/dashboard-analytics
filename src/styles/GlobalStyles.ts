import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #f5f7fa;
    color: #333;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }
`;

export default GlobalStyle;
