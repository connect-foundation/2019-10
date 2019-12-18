import { useState, useEffect } from 'react';
import { useQuery } from 'react-fetching-library';
import { SEARCH_OPTION_VALUES } from '../../../constants';
import { makeQuerySearchAction } from '../action/make-query-search-action';
import { setOptionMap } from '../helper/set-option-map';

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

  useEffect(() => {
    if (error) {
      return;
    }
    if (payload && !error) {
      setTagHasData(true);
      setTagHasMore(payload.data.length >= 20);
      setTags([...payload.data]);
      setTagCount(payload.count);
      setOptionMap(SEARCH_OPTION_VALUES.tags, payload.count);
    }
  }, [payload]);

  return { tags, tagCount, tagHasMore, tagHasData };
};
