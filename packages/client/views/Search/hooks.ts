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
  const [videoHasData, setVideoHasData] = useState(false);

  const action = createSearchVideosAction(page, search);
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

export const useSearchUsers = (page, search) => {
  const [users, setUsers] = useState([]);
  const [userHasMore, setUserHasMore] = useState(true);
  const [userHasData, setUserHasData] = useState(false);

  const action = createSearchUsersAction(page, search);
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

export const useSearchTags = (page, search) => {
  const [tags, setTags] = useState([]);
  const [tagHasMore, setTagHasMore] = useState(true);
  const [tagHasData, setTagHasData] = useState(false);

  const action = createSearchTagsAction(page, search);
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
