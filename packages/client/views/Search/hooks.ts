import { useState, useEffect } from 'react';
import { useQuery, Action } from 'react-fetching-library';

const createSearchVideosAction: Action = (page, keyword) => {
  const queryString = page
    ? `/videos?keyword=${keyword}&page=${page}`
    : `/videos?keyword=${keyword}`;

  return {
    method: 'GET',
    endpoint: `${process.env.API_URL_HOST}${queryString}`,
  };
};

const createSearchUsersAction: Action = (page, keyword) => {
  const queryString = page
    ? `/users?keyword=${keyword}&page=${page}`
    : `/users?keyword=${keyword}`;
  return {
    method: 'GET',
    endpoint: `${process.env.API_URL_HOST}${queryString}`,
  };
};
const createSearchTagsAction: Action = (page, keyword) => {
  const queryString = page
    ? `/tags?keyword=${keyword}&page=${page}`
    : `/tags?keyword=${keyword}`;
  return {
    method: 'GET',
    endpoint: `${process.env.API_URL_HOST}${queryString}`,
  };
};

export const useSearchVideos = (page, search) => {
  const [videos, setVideos] = useState([]);
  const [videoHasMore, setVideoHasMore] = useState(true);

  const action = createSearchVideosAction(page, search);
  const { payload, error } = useQuery(action);

  useEffect(() => {
    if (payload && !error) {
      setVideoHasMore(payload.data.length >= 20);
      setVideos([...payload.data]);
    }
  }, [payload]);

  return { videos, videoHasMore };
};

export const useSearchUsers = (page, search) => {
  const [users, setUsers] = useState([]);
  const [userHasMore, setUserHasMore] = useState(true);

  const action = createSearchUsersAction(page, search);
  const { payload, error } = useQuery(action);

  useEffect(() => {
    if (payload && !error) {
      setUserHasMore(payload.data.length >= 20);
      setUsers([...payload.data]);
    }
  }, [payload]);

  return { users, userHasMore };
};

export const useSearchTags = (page, search) => {
  const [tags, setTags] = useState([]);
  const [tagHasMore, setTagHasMore] = useState(true);

  const action = createSearchTagsAction(page, search);
  const { payload, error } = useQuery(action);

  useEffect(() => {
    if (payload && !error) {
      setTagHasMore(payload.data.length >= 20);
      setTags([...payload.data]);
    }
  }, [payload]);

  return { tags, tagHasMore };
};
