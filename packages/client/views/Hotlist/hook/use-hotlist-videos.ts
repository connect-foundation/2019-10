import { useState, useEffect } from 'react';
import { useQuery, Action } from 'react-fetching-library';
import { HOTLIST_VIDEOS_PER_PAGE, PERIOD } from '../../../constants';
import { makeQueryHotlists } from '../action/make-query-hotlists';

export const useHotlistVideos = () => {
  const [period, setPeriod] = useState(PERIOD.week);
  const [page, setPage] = useState(1);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const action = makeQueryHotlists(page, period);
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
      setVideos([...videos, ...data.payload.data]);
      setHasMore(data.payload.data.length >= HOTLIST_VIDEOS_PER_PAGE);
    };
    fetch();
  }, [page]);

  useEffect(() => {
    const fetch = async () => {
      const data = await state.query();
      if (!data.payload || data.error) {
        return;
      }
      setVideos(data.payload.data);
      setHasMore(data.payload.data.length >= HOTLIST_VIDEOS_PER_PAGE);
    };
    fetch();
  }, [period]);

  const handlePeriod = periodValue => {
    setPeriod(periodValue);
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
    period,
    videos,
    hasMore,
    handlePeriod,
    handleNext,
  };
};
