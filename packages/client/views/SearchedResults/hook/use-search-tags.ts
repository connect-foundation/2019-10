import { useState, useEffect } from 'react';
import { useQuery } from 'react-fetching-library';
import { SEARCH_OPTION_VALUES, SET_OPTION_VISIBILITY } from '../../../constants';
import { makeQuerySearchAction } from '../action/make-query-search-action';
import { useSearchedResultsDispatch } from '../../../components/SearchResultsProvider/hook/use-searched-results';

export const useSearchTags = (page, keyword) => {
  const [tags, setTags] = useState([]);
  const [tagCount, setTagCount] = useState(null);
  const [tagHasMore, setTagHasMore] = useState(true);
  const [tagHasData, setTagHasData] = useState(false);

  const action = makeQuerySearchAction(
    SEARCH_OPTION_VALUES.tags,
    page,
    keyword,
  );
  const { payload, error } = useQuery(action);

  const optionMapDispatch = useSearchedResultsDispatch();

  useEffect(() => {
    if (error) {
      return;
    }

    if (payload && !error) {
      setTagHasData(true);
      setTagHasMore(payload.data.length >= 20);
      setTags([...payload.data]);
      setTagCount(payload.count);
      optionMapDispatch({
        type: SET_OPTION_VISIBILITY,
        value: SEARCH_OPTION_VALUES.tags,
        isVisible: payload.count ? true : false,
      });
    }
  }, [payload]);

  return { tags, tagCount, tagHasMore, tagHasData };
};
