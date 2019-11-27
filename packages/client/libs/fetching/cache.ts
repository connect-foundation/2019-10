import { createCache, QueryResponse } from 'react-fetching-library';
import { Cache } from 'react-fetching-library/lib/cache/cache.types';

export const cache: Cache<QueryResponse> = createCache(
  action => {
    return action.method === 'GET';
  },
  response => {
    return new Date().getTime() - response.timestamp < 30000;
  },
);
