import React from 'react';
import App, { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import 'isomorphic-unfetch';
import { ClientContextProvider as FetchingProvider } from 'react-fetching-library';
import Cookies from 'universal-cookie';

import './interfaces/extend';
import { endpoint } from '../../constants';
import { UserProvider } from '../../components/UserProvider';
import { VideoFileProvider } from '../../components/VideoFileProvider';
import { client } from '../../libs/fetching';
import { requestCurrentUserInfo } from './helper/request-user-info';

class MyApp extends App<AppProps> {
  public static async getInitialProps(appContext) {
    const { pathname, req } = appContext.ctx;

    const props = initProps(pathname);

    if (req) {
      try {
        const cookies = new Cookies(req.headers.cookie);

        const sessionId = cookies.get(process.env.JWT_SESSION_TOKEN_KEY);

        if (!sessionId) {
          throw new Error();
        }

        props.user = await requestCurrentUserInfo(sessionId);
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
    const { Component, pageProps, cacheItems, user, pathname } = this.props;
    const theme = {};

    client.cache.setItems(cacheItems);

    return (
      <FetchingProvider client={client}>
        <ThemeProvider theme={theme}>
          <UserProvider user={user}>
            {this.isNeedFileProvider(pathname) ? (
              <VideoFileProvider>
                <Component {...pageProps} />
              </VideoFileProvider>
            ) : (
              <Component {...pageProps} />
            )}
          </UserProvider>
        </ThemeProvider>
      </FetchingProvider>
    );
  }

  private isNeedFileProvider(pathname: string) {
    return (
      pathname === endpoint.uploadVideoFile ||
      pathname === endpoint.uploadVideoDetail
    );
  }
}

function initProps(pathname: string): AppProps {
  return {
    cacheItems: client.cache.getItems(),
    pathname,
    user: null,
  };
}

export default MyApp;
