import { useReducer } from 'react';
import {
  SearchedResultsStateContext,
  SearchedResultsDispatchContext,
} from './context';
import { SET_TABS } from '../../constants';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_TABS:
      return action.tabs;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const SearchedResultsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    tabs: '',
  });

  return (
    <SearchedResultsDispatchContext.Provider value={dispatch}>
      <SearchedResultsStateContext.Provider value={state}>
        {children}
      </SearchedResultsStateContext.Provider>
    </SearchedResultsDispatchContext.Provider>
  );
};
