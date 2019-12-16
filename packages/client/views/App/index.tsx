import React from 'react';
import App, { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import 'isomorphic-unfetch';
import jwt from 'jsonwebtoken';
import { ClientContextProvider as FetchingProvider } from 'react-fetching-library';
import Cookies from 'universal-cookie';

import './interfaces/extend';
// import { endpoint, QUERY_STRING } from '../../constants';
import { UserProvider } from '../../components/UserProvider';
import { FileProvider } from '../../components/FileProvider';
import { SearchedResultsProvider } from '../../components/SearchResultsProvider';
import { client } from '../../libs/fetching';
import { Token } from './interfaces/Token';
import { User } from './interfaces/User';

class MyApp extends App<AppProps> {
  public static async getInitialProps(appContext) {
    const { pathname, req } = appContext.ctx;

    const props = initProps(pathname);

    if (req) {
      const cookies = new Cookies(req.headers.cookie);

      const token = cookies.get(process.env.JWT_SESSION_TOKEN_KEY);

      try {
        props.user = extractUserPublicInfo(token);
        appContext.ctx.isLoggedIn = true;
      } catch (err) {
        appContext.ctx.isLoggedIn = false;
      }
    }

    const appProps = await App.getInitialProps(appContext);

    return {
      ...appProps,
      ...props,
    };
  }

  public render() {
    const { Component, pageProps, cacheItems, user } = this.props;
    const theme = {};

    client.cache.setItems(cacheItems);

    // TODO: page별 필요한 context 제공하기
    return (
      <FetchingProvider client={client}>
        <ThemeProvider theme={theme}>
          <UserProvider user={user}>
            <SearchedResultsProvider>
              <FileProvider>
                <Component {...pageProps} />
              </FileProvider>
            </SearchedResultsProvider>
          </UserProvider>
        </ThemeProvider>
      </FetchingProvider>
    );
  }

  // private insNeedSearchedResultsProvider(queryString: string) {
  //   return queryString === QUERY_STRING.keyword;
  // }

  // private isNeedFileProvider(pathname: string) {
  //   return (
  //     pathname === endpoint.uploadVideoFile ||
  //     pathname === endpoint.uploadVideoDetail
  //   );
  // }
}

function initProps(pathname: string): AppProps {
  return {
    cacheItems: client.cache.getItems(),
    pathname,
    user: null,
  };
}

function extractUserPublicInfo(token: string): User {
  const {
    data: { userPublicInfo },
  } = jwt.verify(token, process.env.JWT_SECRET) as Token;

  return userPublicInfo;
}

export default MyApp;
