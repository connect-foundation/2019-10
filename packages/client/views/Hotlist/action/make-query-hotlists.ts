import { Action } from 'react-fetching-library';

export const makeQueryHotlists: Action = (page, period) => ({
  method: 'GET',
  endpoint: `${process.env.API_SERVER_URL}/videos?page=${page}&sort=popular&period=${period}`,
});
