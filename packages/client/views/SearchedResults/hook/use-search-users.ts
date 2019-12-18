import { useState, useEffect } from 'react';
import { useQuery } from 'react-fetching-library';
import { SEARCH_OPTION_VALUES } from '../../../constants';
import { makeQuerySearchAction } from '../action/make-query-search-action';
import { setOptionMap } from '../helper/set-option-map';

export const useSearchUsers = (page, keyword) => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(null);
  const [userHasMore, setUserHasMore] = useState(true);
  const [userHasData, setUserHasData] = useState(false);

  const action = makeQuerySearchAction(
    SEARCH_OPTION_VALUES.users,
    page,
    keyword,
  );
  const { payload, error } = useQuery(action);

  useEffect(() => {
    if (error) {
      return;
    }
    if (payload && !error) {
      setUserHasData(true);
      setUserHasMore(payload.data.length >= 20);
      setUsers([...payload.data]);
      setUserCount(payload.count);
      setOptionMap(SEARCH_OPTION_VALUES.users, payload.count);
    }
  }, [payload]);

  return { users, userCount, userHasMore, userHasData };
};
