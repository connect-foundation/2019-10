import { useContext } from 'react';

import {
  SearchedResultsStateContext,
  SearchedResultsDispatchContext,
} from '../context';

export const useSearchedResults = () => useContext(SearchedResultsStateContext);
export const useSearchedResultsDispatch = () => useContext(SearchedResultsDispatchContext);
