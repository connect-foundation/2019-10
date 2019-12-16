import { useReducer } from 'react';
import {
  SearchedResultsTabStateContext,
  SearchedResultsTabDispatchContext,
} from './contexts';

const reducer = (state, action) => {
  switch (action.type) {
    case 'tabs':
      return action.tabs;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const SearchedResultsTabProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});

  return (
    <SearchedResultsTabStateContext.Provider value={dispatch}>
      <SearchedResultsTabDispatchContext.Provider value={state}>
        {children}
      </SearchedResultsTabDispatchContext.Provider>
    </SearchedResultsTabStateContext.Provider>
  );
};
