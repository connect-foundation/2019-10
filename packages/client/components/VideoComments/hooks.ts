import { useState, useEffect } from 'react';
import { useQuery, Action, useMutation } from 'react-fetching-library';
import { COMMENTS_PER_PAGE } from '../../constants';

const createCommentsAction: Action = (videoId, page, sort) => ({
  method: 'GET',
  endpoint: `${process.env.API_SERVER_HOST}/videos/${videoId}/comments?page=${page}&sort=${sort}`,
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
      setHasMore(payload.data.length >= COMMENTS_PER_PAGE);
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

export const useCommentForm = () => {

export const useCommentForm = videoId => {
  const [value, setValue] = useState('');
  const [active, setActive] = useState(false);
  const { loading, error, mutate, reset } = useMutation(createCommentAction);

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
  };

  return {
    value,
    active,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onCancel: handleCancel,
    onSubmit: handleSubmit,
  };
};
