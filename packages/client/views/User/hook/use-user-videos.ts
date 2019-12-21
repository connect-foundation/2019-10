import { USER_VIDEOS_PER_PAGE, SORT } from '../../../constants';
import { useState, useEffect } from 'react';
import { makeQueryUserVideos } from '../action/make-query-user-videos';
import { useQuery } from 'react-fetching-library';
import { useRouter } from 'next/router';

export const useUserVideos = () => {
  const router = useRouter();
  const { userId } = router.query;

  const [sort, setSort] = useState(SORT.POPULAR);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const action = makeQueryUserVideos(userId, page, sort);
  const state = useQuery(action, false);

  useEffect(() => {
    if (page <= 1) {
      return;
    }
    const fetch = async () => {
      const data = await state.query();
      if (!data.payload || data.error) {
        return;
      }
      setCount(data.payload.count);
      setVideos([...videos, ...data.payload.data]);
      setHasMore(data.payload.data.length >= USER_VIDEOS_PER_PAGE);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const data = await state.query();
      if (!data.payload || data.error) {
        return;
      }
      setCount(data.payload.count);
      setVideos(data.payload.data);
      setHasMore(data.payload.data.length >= USER_VIDEOS_PER_PAGE);
    };
    fetch();
  }, [sort]);

  const handleSort = sortValue => {
    setSort(sortValue);
    setPage(1);
    setVideos([]);
    setHasMore(true);
  };

  const handleNext = () => {
    if (videos.length > 0) {
      setPage(page + 1);
    }
  };

  return {
    sort,
    count,
    videos,
    hasMore,
    handleSort,
    handleNext,
  };
};
