import { useState, useEffect } from 'react';
import { useQuery, Action, useMutation } from 'react-fetching-library';
import { COMMENTS_PER_PAGE } from '../../constants';

export const getPopularCommentsAction: Action = (videoId, page) => ({
  method: 'GET',
  endpoint: `${process.env.API_URL_HOST}/videos/${videoId}/comments?page=${page}&sort=popular`,
  credentials: 'include',
});

export const getLatestCommentsAction: Action = (videoId, page) => ({
  method: 'GET',
  endpoint: `${process.env.API_URL_HOST}/videos/${videoId}/comments?page=${page}&sort=latest`,
  credentials: 'include',
});

export const usePopularComments = (videoId, sort) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(null);
  const [comments, setComments] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const action = getPopularCommentsAction(videoId, page);
  const { payload, error, reset, query, ...rest } = useQuery(action, false);

  useEffect(() => {
    if (payload && !error) {
      setHasData(true);
      setHasMore(payload.data.length >= 5);
      setCount(payload.count);
      page > 1
        ? setComments([...comments, ...payload.data])
        : setComments(payload.data);
    }
  }, [payload, error]);

  useEffect(() => {
    if (page === 1 && sort === 'popular') {
      query();
      return;
    }

    if (page > 1) {
      query();
    }
  }, [page, sort]);

  useEffect(() => {
    setPage(1);
  }, [sort]);

  const handleNext = () => {
    setPage(page + 1);
  };

  const initializePage = () => {
    setComments([]);
    setTimeout(() => {
      setPage(1);
    });
  };

  return {
    comments,
    count,
    hasMore,
    hasData,
    reset,
    query,
    onNext: handleNext,
    onInitialize: initializePage,
  };
};

export const useLatestComments = (videoId, sort) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(null);
  const [comments, setComments] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const action = getLatestCommentsAction(videoId, page);
  const { payload, error, reset, query, ...rest } = useQuery(action, false);

  useEffect(() => {
    if (payload && !error) {
      setHasData(true);
      setHasMore(payload.data.length >= COMMENTS_PER_PAGE);
      setCount(payload.count);
      page > 1
        ? setComments([...comments, ...payload.data])
        : setComments(payload.data);
    }
  }, [payload, error]);

  useEffect(() => {
    if (page === 1 && sort === 'latest') {
      query();
      return;
    }

    if (page > 1) {
      query();
    }
  }, [page, sort]);

  useEffect(() => {
    setPage(1);
  }, [sort]);

  const handleNext = () => {
    setPage(page + 1);
  };

  const initializePage = () => {
    setComments([]);
    setTimeout(() => {
      setPage(1);
    });
  };

  return {
    comments,
    count,
    hasMore,
    hasData,
    query,
    onNext: handleNext,
    onInitialize: initializePage,
  };
};

export const useComments = (videoId, sort, insertedComments) => {
  const popularCommentsState = usePopularComments(videoId, sort);
  const latestCommentsState = useLatestComments(videoId, sort);

  const state = sort === 'popular' ? popularCommentsState : latestCommentsState;

  useEffect(() => {
    state.onInitialize();
  }, [insertedComments]);

  const comments = state.comments.filter(comment => {
    let isDuplicate = false;
    for (const item of insertedComments) {
      if (item.id === comment.id) {
        isDuplicate = true;
        break;
      }
    }
    return !isDuplicate;
  });

  return {
    ...state,
    comments,
    sort,
  };
};

const createCommentAction: Action = ({ videoId, payload }) => ({
  method: 'POST',
  endpoint: `${process.env.API_URL_HOST}/videos/${videoId}/comments`,
  credentials: 'include',
  body: payload,
});

export const useCommentForm = (videoId, sort) => {
  const [insertedComments, setInsertedComments] = useState([]);
  const [value, setValue] = useState('');
  const [active, setActive] = useState(false);
  const { loading, error, mutate, reset } = useMutation(createCommentAction);

  useEffect(() => {
    setInsertedComments([]);
  }, [sort]);

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleFocus = () => {
    setActive(true);
  };

  const handleBlur = () => {
    if (value === '') {
      setActive(false);
    }
  };

  const handleCancel = () => {
    setActive(false);
    setValue('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const { payload } = await mutate({
      videoId,
      payload: {
        content: value,
      },
    });
    setValue('');
    setActive(false);
    setInsertedComments([payload, ...insertedComments]);
  };

  return {
    value,
    active,
    insertedComments,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onCancel: handleCancel,
    onSubmit: handleSubmit,
  };
};
