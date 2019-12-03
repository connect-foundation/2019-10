import { Action, useQuery } from 'react-fetching-library';
import { useEffect, useState } from 'react';

const createLatestAction: Action = page => ({
  method: 'GET',
  endpoint: `${process.env.API_URL_HOST}/videos?page=${page}&sort=latest`,
});

export const useLatestVideos = page => {
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const action = createLatestAction(page);
  const { payload, error, ...rest } = useQuery(action);

  useEffect(() => {
    if (payload && !error) {
      setHasMore(payload.data.length >= 20);
      setVideos([...videos, ...payload.data]);
    }
  }, [payload]);

  return { videos, hasMore, ...rest };
};
