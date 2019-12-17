import { useState, useEffect } from 'react';
import { useQuery } from 'react-fetching-library';
import { SEARCH_OPTION_LABELS, SEARCH_OPTION_VALUES } from '../../../constants';
import { makeQuerySearchAction } from '../action/make-query-search-action';

const optionMap = new Map();
optionMap.set(SEARCH_OPTION_VALUES.all, {
  label: SEARCH_OPTION_LABELS.all,
});
optionMap.set(SEARCH_OPTION_VALUES.videos, {
  label: SEARCH_OPTION_LABELS.videos,
});
optionMap.set(SEARCH_OPTION_VALUES.users, {
  label: SEARCH_OPTION_LABELS.users,
});
optionMap.set(SEARCH_OPTION_VALUES.tags, {
  label: SEARCH_OPTION_LABELS.tags,
});

export const setOptionMap = (type, count) => {
  optionMap.get(SEARCH_OPTION_VALUES[type]).count = count;
};

export const makeCustomSearchOptions = () => {
  const customSearchOptions = [];

  optionMap.forEach((key, value) => {
    if (key.count) {
      customSearchOptions.push({ label: key.label, value });
    }
  });

  if (customSearchOptions.length >= 2 || !customSearchOptions.length) {
    customSearchOptions.unshift({
      label: SEARCH_OPTION_LABELS.all,
      value: SEARCH_OPTION_VALUES.all,
    });
  }

  return customSearchOptions;
};

export const makeOptions = optionArray => {
  const options = optionArray
    .map(option => {
      return option.value;
    })
    .join(',');

  return options;
};

export const useSearchVideos = (page, keyword) => {
  const [videos, setVideos] = useState([]);
  const [videoCount, setVideoCount] = useState(null);
  const [videoHasMore, setVideoHasMore] = useState(true);
  const [videoHasData, setVideoHasData] = useState(false);

  const action = makeQuerySearchAction(
    SEARCH_OPTION_VALUES.videos,
    page,
    keyword,
  );
  const { payload, error } = useQuery(action);

  useEffect(() => {
    if (error) {
      return;
    }
    if (payload && !error) {
      setVideoHasData(true);
      setVideoHasMore(payload.data.length >= 20);
      setVideos([...payload.data]);
      setVideoCount(payload.count);
      setOptionMap(SEARCH_OPTION_VALUES.videos, payload.count);
    }
  }, [payload]);

  return { videos, videoCount, videoHasMore, videoHasData };
};

export const useSearchUsers = (page, keyword) => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(null);
  const [userHasMore, setUserHasMore] = useState(true);
  const [userHasData, setUserHasData] = useState(false);

  const action = makeQuerySearchAction(
    SEARCH_OPTION_VALUES.users,
    page,
    keyword,
  );
  const { payload, error } = useQuery(action);

  useEffect(() => {
    if (error) {
      return;
    }
    if (payload && !error) {
      setUserHasData(true);
      setUserHasMore(payload.data.length >= 20);
      setUsers([...payload.data]);
      setUserCount(payload.count);
      setOptionMap(SEARCH_OPTION_VALUES.users, payload.count);
    }
  }, [payload]);

  return { users, userCount, userHasMore, userHasData };
};

export const useSearchTags = (page, keyword) => {
  const [tags, setTags] = useState([]);
  const [tagCount, setTagCount] = useState(null);
  const [tagHasMore, setTagHasMore] = useState(true);
  const [tagHasData, setTagHasData] = useState(false);

  const action = makeQuerySearchAction(
    SEARCH_OPTION_VALUES.tags,
    page,
    keyword,
  );
  const { payload, error } = useQuery(action);

  useEffect(() => {
    if (error) {
      return;
    }
    if (payload && !error) {
      setTagHasData(true);
      setTagHasMore(payload.data.length >= 20);
      setTags([...payload.data]);
      setTagCount(payload.count);
      setOptionMap(SEARCH_OPTION_VALUES.tags, payload.count);
    }
  }, [payload]);

  return { tags, tagCount, tagHasMore, tagHasData };
};
