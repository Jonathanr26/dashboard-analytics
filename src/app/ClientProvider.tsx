"use client";

import { ThemeProvider } from "styled-components";
import GlobalStyle from "../styles/GlobalStyles";
import theme from "../styles/theme";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default ClientProvider;
