import { useState, useEffect } from 'react';
import { useQuery } from 'react-fetching-library';
import { TAG_VIDEOS_PER_PAGE } from '../../constants';
import { Tag } from './model/tag';
import { getTagAction, getTagVideosAction } from './action/tag-videos-action';

export const useTag = (id: number) => {
  const [tag, setTag] = useState(new Tag(0, '', 0));

  const action = getTagAction(id);
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

  const action = getTagVideosAction(id, page, sort);
  const { payload, error, ...rest } = useQuery(action);

  useEffect(() => {
    setVideos([]);
  }, [sort]);

  useEffect(() => {
    if (payload && !error) {
      setHasMore(payload.data.length >= TAG_VIDEOS_PER_PAGE);
      setVideos([...videos, ...payload.data]);
    }
  }, [payload]);

  return { videos, hasMore, ...rest };
};
