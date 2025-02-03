import React from "react";
import { ThemeProvider } from "../context/ThemeContext";

const MyApp = ({ Component, pageProps }: any) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
