import { useState, useEffect } from 'react';
import { useQuery, Action } from 'react-fetching-library';

const createCommentsAction: Action = (videoId, page, sort) => ({
  method: 'GET',
  endpoint: `${process.env.API_URL_HOST}/videos/${videoId}/comments?page=${page}&sort=${sort}`,
});

export const useComments = videoId => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('popular'); // popular or latest
  const [count, setCount] = useState(null);
  const [comments, setComments] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const action = createCommentsAction(videoId, page, sort);
  const { payload, error, ...rest } = useQuery(action);

  useEffect(() => {
    setPage(1);
    setHasData(false);
  }, [sort]);

  useEffect(() => {
    if (payload && !error) {
      setHasData(true);
      setHasMore(payload.data.length >= 5);
      setCount(payload.count);
      page === 1
        ? setComments(payload.data)
        : setComments([...comments, ...payload.data]);
    }
  }, [payload, error]);

  return {
    comments,
    count,
    sort,
    hasMore,
    hasData,
    onNext: () => setPage(page + 1),
    onSort: value => setSort(value),
  };
};
