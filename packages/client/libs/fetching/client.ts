import { createClient } from 'react-fetching-library';
import { cache } from './cache';

export const client = createClient({
  cacheProvider: cache,
});
