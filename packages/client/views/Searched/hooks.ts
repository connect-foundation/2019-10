import { useState, useEffect } from 'react';
import { useQuery, Action } from 'react-fetching-library';

import { search } from '../../constants';

const createSearchAction: Action = (subject, page, keyword) => {
  const queryString = page
    ? `/${subject}?keyword=${keyword}&page=${page}`
    : `/${subject}?keyword=${keyword}`;
  return {
    method: 'GET',
    endpoint: `${process.env.API_SERVER_HOST}${queryString}`,
  };
};

export const useSearchVideos = (page, keyword) => {
  const [videos, setVideos] = useState([]);
  const [videoCount, setVideoCount] = useState(null);
  const [videoHasMore, setVideoHasMore] = useState(true);
  const [videoHasData, setVideoHasData] = useState(false);

  const action = createSearchAction(search.videos, page, keyword);
  const { payload, error } = useQuery(action);

  useEffect(() => {
    if (payload && !error) {
      setVideoHasData(true);
      setVideoHasMore(payload.data.length >= 20);
      setVideos([...payload.data]);
      setVideoCount(payload.count);
    }
  }, [payload]);

  return { videos, videoCount, videoHasMore, videoHasData };
};

export const useSearchUsers = (page, keyword) => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(null);
  const [userHasMore, setUserHasMore] = useState(true);
  const [userHasData, setUserHasData] = useState(false);

  const action = createSearchAction(search.users, page, keyword);
  const { payload, error } = useQuery(action);

  useEffect(() => {
    if (payload && !error) {
      setUserHasData(true);
      setUserHasMore(payload.data.length >= 20);
      setUsers([...payload.data]);
      setUserCount(payload.count);
    }
  }, [payload]);

  return { users, userCount, userHasMore, userHasData };
};

export const useSearchTags = (page, keyword) => {
  const [tags, setTags] = useState([]);
  const [tagCount, setTagCount] = useState(null);
  const [tagHasMore, setTagHasMore] = useState(true);
  const [tagHasData, setTagHasData] = useState(false);

  const action = createSearchAction(search.tags, page, keyword);
  const { payload, error } = useQuery(action);

  useEffect(() => {
    if (payload && !error) {
      setTagHasData(true);
      setTagHasMore(payload.data.length >= 20);
      setTags([...payload.data]);
      setTagCount(payload.count);
    }
  }, [payload]);

  return { tags, tagCount, tagHasMore, tagHasData };
};
