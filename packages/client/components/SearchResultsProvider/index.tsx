import { useReducer } from 'react';
import {
  SearchedResultsStateContext,
  SearchedResultsDispatchContext,
} from './context';
import { SET_MAP, SEARCH_OPTION_VALUES } from '../../constants';
import { makeCustomOptionMap } from './helper/make-custom-option-map';

const reducer = (state, action) => {
  switch (action.type) {

    case SET_MAP:
      const newMap = new Map(state.optionMap);
      const valueObject = state.optionMap.get(SEARCH_OPTION_VALUES[action.value]);
      valueObject.isView = action.isView;
      newMap.set(SEARCH_OPTION_VALUES[action.value], Object.create(valueObject));

      return {
        ...state,
        optionMap: newMap,
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const optionMap = makeCustomOptionMap();

export const SearchedResultsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    optionMap,
  });

  return (
    <SearchedResultsDispatchContext.Provider value={dispatch}>
      <SearchedResultsStateContext.Provider value={state}>
        {children}
      </SearchedResultsStateContext.Provider>
    </SearchedResultsDispatchContext.Provider>
  );
};
