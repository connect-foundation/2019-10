import { Action, useQuery } from 'react-fetching-library';
import { useState, useEffect } from 'react';

const createUserAction: Action = id => ({
  method: 'GET',
  endpoint: `${process.env.API_URL_HOST}/users/${id}`,
});

export const useUser = id => {
  const [hasData, setHasData] = useState(false);
  const [user, setUser] = useState({
    id: '',
    username: '',
    description: '',
    avatar: '',
    createdAt: '',
    updatedAt: '',
  });

  const action = createUserAction(id);
  const { payload, error, ...rest } = useQuery(action);

  useEffect(() => {
    if (payload && !error) {
      setHasData(true);
      setUser(payload);
    }
  }, [payload, error]);

  return {
    user,
    hasData,
  };
};

const createVideosAction: Action = (id, page, sort) => ({
  method: 'GET',
  endpoint: `${process.env.API_URL_HOST}/users/${id}/videos?page=${page}&sort=${sort}`,
});

export const useVideos = id => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('popular'); // popular or latest
  const [count, setCount] = useState(null);
  const [videos, setVideos] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const action = createVideosAction(id, page, sort);
  const { payload, error, ...rest } = useQuery(action);

  useEffect(() => {
    setPage(1);
    setHasData(false);
  }, [sort]);

  useEffect(() => {
    if (payload && !error) {
      setHasData(true);
      setHasMore(payload.data.length >= 12);
      setCount(payload.count);
      page === 1
        ? setVideos(payload.data)
        : setVideos([...videos, ...payload.data]);
    }
  }, [payload, error]);

  return {
    videos,
    count,
    sort,
    hasMore,
    hasData,
    onNext: () => setPage(page + 1),
    onSort: value => setSort(value),
  };
};
