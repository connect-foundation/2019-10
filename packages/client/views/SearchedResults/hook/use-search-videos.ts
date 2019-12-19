import { useState, useEffect } from 'react';
import { useQuery } from 'react-fetching-library';
import { SEARCH_OPTION_VALUES, SET_MAP } from '../../../constants';
import { makeQuerySearchAction } from '../action/make-query-search-action';
import { useSearchedResultsDispatch } from '../../../components/SearchResultsProvider/hook/use-searched-results';

export const useSearchVideos = (page, keyword) => {
  const [videos, setVideos] = useState([]);
  const [videoCount, setVideoCount] = useState(null);
  const [videoHasMore, setVideoHasMore] = useState(true);
  const [videoHasData, setVideoHasData] = useState(false);

  const action = makeQuerySearchAction(
    SEARCH_OPTION_VALUES.videos,
    page,
    keyword,
  );
  const { payload, error } = useQuery(action);

  useEffect(() => {
    if (error) {
      return;
    }
    if (payload && !error) {
      const optionMapDispatch = useSearchedResultsDispatch();

      setVideoHasData(true);
      setVideoHasMore(payload.data.length >= 20);
      setVideos([...payload.data]);
      setVideoCount(payload.count);
      optionMapDispatch({
        type: SET_MAP,
        value: SEARCH_OPTION_VALUES.tags,
        count: payload.count,
      });
    }
  }, [payload]);

  return { videos, videoCount, videoHasMore, videoHasData };
};
