import { useState, useEffect } from 'react';
import { useQuery } from 'react-fetching-library';
import { SEARCH_OPTION_VALUES } from '../../../constants';
import { makeQuerySearchAction } from '../action/make-query-search-action';
import { setOptionMap } from '../helper/set-option-map';

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
      setVideoHasData(true);
      setVideoHasMore(payload.data.length >= 20);
      setVideos([...payload.data]);
      setVideoCount(payload.count);
      setOptionMap(SEARCH_OPTION_VALUES.videos, payload.count);
    }
  }, [payload]);

  return { videos, videoCount, videoHasMore, videoHasData };
};
