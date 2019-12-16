import { useContext } from 'react';

import {
  SearchedResultsStateContext,
  SearchedResultsDispatchContext,
} from './contexts';

export const useSearchedResults = () => useContext(SearchedResultsStateContext);
export const useSearchedResultsDispatch = () =>
  useContext(SearchedResultsDispatchContext);
