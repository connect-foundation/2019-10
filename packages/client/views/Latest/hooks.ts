import { Action, useQuery } from 'react-fetching-library';
import { useEffect, useState } from 'react';
import { LATEST_VIDEOS_PER_PAGE } from '../../constants';

const createLatestAction: Action = page => ({
  method: 'GET',
  endpoint: `${process.env.API_SERVER_URL}/videos?page=${page}&sort=latest`,
  credentials: 'include',
});

export const useLatestVideos = page => {
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const action = createLatestAction(page);
  const { payload, error, ...rest } = useQuery(action);

  useEffect(() => {
    if (payload && !error) {
      setHasMore(payload.data.length >= LATEST_VIDEOS_PER_PAGE);
      setVideos([...videos, ...payload.data]);
    }
  }, [payload]);

  return { videos, hasMore, ...rest };
};
