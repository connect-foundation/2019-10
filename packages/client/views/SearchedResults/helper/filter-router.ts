import { endpoint, SEARCH_OPTION_VALUES } from '../../../constants';

export const makeRouter = (queryKeyword, optionValue) => {

  const pathname =
    optionValue === SEARCH_OPTION_VALUES.all
      ? `${endpoint.search}`
      : `${endpoint.search}/${optionValue}`;

  return {
    pathname,
    query: { keyword: queryKeyword },
  };
};
