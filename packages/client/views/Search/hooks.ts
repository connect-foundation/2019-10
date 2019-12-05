import { useState, useEffect } from 'react';
import { useQuery, Action } from 'react-fetching-library';

import { search } from '../../constants';

const createSearchAction: Action = (subject, page, keyword) => {
  const queryString = page
    ? `/${subject}?keyword=${keyword}&page=${page}`
    : `/${subject}?keyword=${keyword}`;
  return {
    method: 'GET',
    endpoint: `${process.env.API_URL_HOST}${queryString}`,
  };
};

export const useSearchVideos = (page, keyword) => {
  const [videos, setVideos] = useState([]);
  const [videoHasMore, setVideoHasMore] = useState(true);
  const [videoHasData, setVideoHasData] = useState(false);

  const action = createSearchAction(search.videos, page, keyword);
  const { payload, error } = useQuery(action);

  useEffect(() => {
    if (payload && !error) {
      setVideoHasData(true);
      setVideoHasMore(payload.data.length >= 20);
      setVideos([...payload.data]);
    }
  }, [payload]);

  return { videos, videoHasMore, videoHasData };
};

export const useSearchUsers = (page, keyword) => {
  const [users, setUsers] = useState([]);
  const [userHasMore, setUserHasMore] = useState(true);
  const [userHasData, setUserHasData] = useState(false);

  const action = createSearchAction(search.users, page, keyword);
  const { payload, error } = useQuery(action);

  useEffect(() => {
    if (payload && !error) {
      setUserHasData(true);
      setUserHasMore(payload.data.length >= 20);
      setUsers([...payload.data]);
    }
  }, [payload]);

  return { users, userHasMore, userHasData };
};

export const useSearchTags = (page, keyword) => {
  const [tags, setTags] = useState([]);
  const [tagHasMore, setTagHasMore] = useState(true);
  const [tagHasData, setTagHasData] = useState(false);

  const action = createSearchAction(search.tags, page, keyword);
  const { payload, error } = useQuery(action);

  useEffect(() => {
    if (payload && !error) {
      setTagHasData(true);
      setTagHasMore(payload.data.length >= 20);
      setTags([...payload.data]);
    }
  }, [payload]);

  return { tags, tagHasMore, tagHasData };
};
