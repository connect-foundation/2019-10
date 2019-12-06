import { useState, useEffect } from 'react';
import { useQuery, Action } from 'react-fetching-library';
import { TAGS_PER_PAGE } from '../../constants';

export const createTagListAction: Action = (page: number) => ({
  method: 'GET',
  endpoint: `${process.env.API_URL_HOST}/tags?page=${page}`,
});

export const useTags = (page: number) => {
  const [tags, setTags] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const action = createTagListAction(page);
  const { payload, error } = useQuery(action);

  useEffect(() => {
    if (payload && !error) {
      setHasMore(payload.count >= TAGS_PER_PAGE);
      setTags([...tags, ...payload.data]);
    }
  }, [payload]);

  return { tags, hasMore };
};
