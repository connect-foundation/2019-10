import { useState, useEffect } from 'react';
import { useQuery } from 'react-fetching-library';
import { SEARCH_OPTION_VALUES, SET_OPTION_VISIBILITY } from '../../../constants';
import { makeQuerySearchAction } from '../action/make-query-search-action';
import { useSearchedResultsDispatch } from '../../../components/SearchResultsProvider/hook/use-searched-results';

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

  const dispathOptionMap = useSearchedResultsDispatch();

  useEffect(() => {
    if (error) {
      return;
    }

    if (payload && !error) {

      setUserHasData(true);
      setUserHasMore(payload.data.length >= 20);
      setUsers([...payload.data]);
      setUserCount(payload.count);
      dispathOptionMap({
        type: SET_OPTION_VISIBILITY,
        value: SEARCH_OPTION_VALUES.users,
        isVisible: payload.count ? true : false,
      });
    }
  }, [payload]);

  return { users, userCount, userHasMore, userHasData };
};
