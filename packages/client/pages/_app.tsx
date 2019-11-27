import React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'styled-components';
import 'isomorphic-unfetch';
import {
  ClientContextProvider as FetchingProvider,
  QueryResponse,
} from 'react-fetching-library';

import { client } from '../libs/fetching';

const theme = {};

interface AppProps {
  cacheItems: {
    [key: string]: QueryResponse;
  };
}

class MyApp extends App<AppProps> {
  public static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);

    return {
      ...appProps,
      cacheItems: client.cache.getItems(),
    };
  }

  public render() {
    const { Component, pageProps, cacheItems } = this.props;
    client.cache.setItems(cacheItems);

    return (
      <FetchingProvider client={client}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </FetchingProvider>
    );
  }
}

export default MyApp;
