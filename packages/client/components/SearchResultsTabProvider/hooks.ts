import { useContext } from 'react';

import {
  SearchedResultsTabStateContext,
  SearchedResultsTabDispatchContext,
} from './contexts';

export const useSearchedResultsTab = () =>
  useContext(SearchedResultsTabStateContext);
export const useSearchedResultsTabDispatch = () =>
  useContext(SearchedResultsTabDispatchContext);
