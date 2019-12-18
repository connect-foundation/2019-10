import { Action } from 'react-fetching-library';

export const makeQuerySearchAction: Action = (subject, page, keyword) => {
  const queryString = page
    ? `/${subject}?keyword=${keyword}&page=${page}`
    : `/${subject}?keyword=${keyword}`;
  return {
    method: 'GET',
    endpoint: `${process.env.API_URL_HOST}${queryString}`,
  };
};
