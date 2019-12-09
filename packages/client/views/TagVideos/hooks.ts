import { useState, useEffect } from 'react';
import { useQuery, Action } from 'react-fetching-library';

const createTagAction: Action = (id: number) => ({
  method: 'GET',
  endpoint: `${process.env.API_URL_HOST}/tags/${id}`,
});

const createTagVideosAction: Action = (
  id: number,
  page: number,
  sort: string,
) => ({
  method: 'GET',
  endpoint: `${process.env.API_URL_HOST}/tags/${id}/videos?page=${page}&sort=${sort}`,
});

export const useTag = (id: number) => {
  const [tag, setTag] = useState({
    name: null,
  });

  const action = createTagAction(id);
  const { payload, error, ...rest } = useQuery(action);

  useEffect(() => {
    if (payload && !error) {
      setTag(payload);
    }
  }, [payload]);

  return { tag, error };
};

export const useTagVideos = (id: number, page: number, sort: string) => {
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const action = createTagVideosAction(id, page, sort);
  const { payload, error, ...rest } = useQuery(action);

  useEffect(() => {
    setVideos([]);
  }, [sort]);

  useEffect(() => {
    if (payload && !error) {
      setHasMore(payload.data.length >= 20);
      setVideos([...videos, ...payload.data]);
    }
  }, [payload]);

  return { videos, hasMore, ...rest };
};
