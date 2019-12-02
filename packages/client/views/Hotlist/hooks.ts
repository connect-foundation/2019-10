import { useState, useEffect } from 'react';
import { useQuery, Action } from 'react-fetching-library';

const createHotlistAction: Action = (page, period) => ({
  method: 'GET',
  endpoint: `${process.env.API_URL_HOST}/videos?page=${page}&sort=popular&period=${period}`,
});

export const useHotlistVideos = (page, period) => {
  const [videos, setVideos] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const action = createHotlistAction(page, period);
  const { payload, error, ...rest } = useQuery(action);

  useEffect(() => {
    setVideos([]);
    setHasData(false);
  }, [period]);

  useEffect(() => {
    if (payload && !error) {
      setHasData(true);
      setHasMore(payload.data.length >= 20);
      page === 1
        ? setVideos(payload.data)
        : setVideos([...videos, ...payload.data]);
    }
  }, [payload, error]);

  return { videos, hasMore, hasData, ...rest };
};
