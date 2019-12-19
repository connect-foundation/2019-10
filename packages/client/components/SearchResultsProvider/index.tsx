import { useReducer } from 'react';
import {
  SearchedResultsStateContext,
  SearchedResultsDispatchContext,
} from './context';
import { SET_TABS, SET_MAP, SEARCH_OPTION_VALUES } from '../../constants';
import { makeCustomOptionMap } from './helper/make-custom-option-map';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_TABS:
      return action.tabs;
    case SET_MAP:
      return {
        ...state,
        maps: state.maps.get(SEARCH_OPTION_VALUES[action.value]).count = action.count,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const optionMap = makeCustomOptionMap();

export const SearchedResultsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    tabs: '',
    maps: optionMap,
  });

  return (
    <SearchedResultsDispatchContext.Provider value={dispatch}>
      <SearchedResultsStateContext.Provider value={state}>
        {children}
      </SearchedResultsStateContext.Provider>
    </SearchedResultsDispatchContext.Provider>
  );
};
