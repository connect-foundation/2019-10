import { useState, useEffect } from 'react';
import { useQuery } from 'react-fetching-library';
import { TAG_VIDEOS_PER_PAGE } from '../../../constants';
import { makeQueryTagVideosAction } from '../action/make-query-tag-videos-action';

export const useVideos = (id: number, page: number, sort: string) => {
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const action = makeQueryTagVideosAction(id, page, sort);
  const { payload, error, ...rest } = useQuery(action);

  useEffect(() => {
    setVideos([]);
  }, [sort]);

  useEffect(() => {
    if (!payload) {
      // handle Error
      return;
    }
    if (!error) {
      setHasMore(payload.data.length >= TAG_VIDEOS_PER_PAGE);
      setVideos([...videos, ...payload.data]);
    }
  }, [payload]);

  return { videos, hasMore, ...rest };
};
