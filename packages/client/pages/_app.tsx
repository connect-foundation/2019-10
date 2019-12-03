import React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'styled-components';
import 'isomorphic-unfetch';
import jwt from 'jsonwebtoken';
import {
  ClientContextProvider as FetchingProvider,
  QueryResponse,
} from 'react-fetching-library';
import Cookies from 'universal-cookie';

import { client } from '../libs/fetching';

const theme = {};

interface AppProps {
  cacheItems: {
    [key: string]: QueryResponse;
  };
  user: User;
}

interface User {
  id: number;
  email: string;
  username: string;
  avatar: string;
}

interface Token {
  data: {
    sessionId: string;
    userPublicInfo: User;
  };
  iat: number;
  exp: number;
}

class MyApp extends App<AppProps> {
  public static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);

    const props = {
      ...appProps,
      cacheItems: client.cache.getItems(),
      user: null,
    };

    // only on server-side
    if (appContext.ctx.req) {
      const cookies = new Cookies(appContext.ctx.req.headers.cookie);
      const token = cookies.get('SessionToken');

      try {
        const {
          data: { userPublicInfo },
        } = jwt.verify(token, 'HUNGRY') as Token;
        props.user = userPublicInfo;
      } catch (err) {
        // console.log(err);
      }
    }

    return props;
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
