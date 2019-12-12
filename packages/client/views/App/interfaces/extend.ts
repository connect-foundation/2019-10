import { QueryResponse } from 'react-fetching-library';
import { User } from './User';

declare module 'next' {
  export interface NextPageContext {
    isLoggedIn: boolean;
  }
}

declare module 'next/app' {
  export interface AppProps {
    cacheItems: {
      [key: string]: QueryResponse;
    };
    user: User;
    pathname: string;
  }
}
