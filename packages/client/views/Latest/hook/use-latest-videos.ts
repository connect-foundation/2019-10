import { useState, useEffect } from 'react';
import { makeQueryLatest } from '../action/mutate-query-latest';
import { useQuery } from 'react-fetching-library';
import { LATEST_VIDEOS_PER_PAGE } from '../../../constants';

export const useLatestVideos = () => {
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const action = makeQueryLatest(page);
  const state = useQuery(action, false);

  useEffect(() => {
    const fetch = async () => {
      const data = await state.query();
      if (!data.payload || data.error) {
        return;
      }
      setVideos([...videos, ...data.payload.data]);
      setHasMore(data.payload.data.length >= LATEST_VIDEOS_PER_PAGE);
    };
    fetch();
  }, [page]);

  const handleNext = () => {
    if (videos.length > 0) {
      setPage(page + 1);
    }
  };

  return {
    videos,
    hasMore,
    handleNext,
  };
};
