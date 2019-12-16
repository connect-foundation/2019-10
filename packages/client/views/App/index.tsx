import React from 'react';
import App, { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import 'isomorphic-unfetch';
import jwt from 'jsonwebtoken';
import { ClientContextProvider as FetchingProvider } from 'react-fetching-library';
import Cookies from 'universal-cookie';

import './interfaces/extend';
import { endpoint, QUERY_STRING } from '../../constants';
import { UserProvider } from '../../components/UserProvider';
import { FileProvider } from '../../components/FileProvider';
import { SearchedResultsTabProvider } from '../../components/SearchResultsTabProvider';
import { client } from '../../libs/fetching';
import { Token } from './interfaces/Token';
import { User } from './interfaces/User';

class MyApp extends App<AppProps> {
  public static async getInitialProps(appContext) {
    const { pathname, queryString, req } = appContext.ctx;

    const props = initProps(pathname, queryString);

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
    const {
      Component,
      pageProps,
      cacheItems,
      user,
      pathname,
      queryString,
    } = this.props;
    const theme = {};

    client.cache.setItems(cacheItems);

    return (
      <FetchingProvider client={client}>
        <ThemeProvider theme={theme}>
          <UserProvider user={user}>
            {this.insNeedSearchedResultsTabProvider(queryString) ? (
              <SearchedResultsTabProvider>
                <Component {...pageProps} />
              </SearchedResultsTabProvider>
            ) : (
              <Component {...pageProps} />
            )}
            {this.isNeedFileProvider(pathname) ? (
              <FileProvider>
                <Component {...pageProps} />
              </FileProvider>
            ) : (
              <Component {...pageProps} />
            )}
          </UserProvider>
        </ThemeProvider>
      </FetchingProvider>
    );
  }

  private insNeedSearchedResultsTabProvider(queryString: string) {
    return queryString === QUERY_STRING.keyword;
  }

  private isNeedFileProvider(pathname: string) {
    return (
      pathname === endpoint.uploadVideoFile ||
      pathname === endpoint.uploadVideoDetail
    );
  }
}

function initProps(pathname: string, queryString: string): AppProps {
  return {
    cacheItems: client.cache.getItems(),
    pathname,
    queryString,
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
