import React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'styled-components';

const theme = {};

class MyApp extends App {
  public render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }
}

export default MyApp;
