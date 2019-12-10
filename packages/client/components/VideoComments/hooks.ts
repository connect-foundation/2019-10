import { Action, useQuery, useMutation } from 'react-fetching-library';
import { useState, useEffect } from 'react';
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

const createCommentAction: Action = ({ videoId, payload }) => ({
  method: 'POST',
  endpoint: `${process.env.API_URL_HOST}/videos/${videoId}/comments`,
  credentials: 'include',
  body: payload,
});

export const useComments = videoId => {
  // comments
  const [sort, setSort] = useState('popular');
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // form
  const [formValue, setFormValue] = useState('');
  const [formActive, setFormActive] = useState(false);
  const [submittedComments, setSubmittedComments] = useState([]);

  const action =
    sort === 'popular'
      ? getPopularCommentsAction(videoId, page)
      : getLatestCommentsAction(videoId, page);

  const queryState = useQuery(action, false);
  const mutationState = useMutation(createCommentAction);

  useEffect(() => {
    if (page > 1) {
      const fetch = async () => {
        const data = await queryState.query();
        if (data.payload && !data.error) {
          setCount(data.payload.count);
          setComments([...comments, ...data.payload.data]);
          setHasMore(data.payload.data.length >= 5);
        }
      };
      fetch();
    }
  }, [page]);

  useEffect(() => {
    const fetch = async () => {
      const data = await queryState.query();
      if (data.payload && !data.error) {
        setCount(data.payload.count);
        setComments(data.payload.data);
        setHasMore(data.payload.data.length >= 5);
      }
    };
    fetch();
  }, [sort]);

  // comments
  const handleSort = sortValue => {
    setPage(1);
    setSort(sortValue);
    setCount(0);
    setComments([]);
    setSubmittedComments([]);
  };

  const handleNext = () => {
    if (comments.length > 0) {
      setPage(page + 1);
    }
  };

  // form
  const handleFormChange = e => {
    setFormValue(e.target.value);
  };

  const handleFormFocus = () => {
    setFormActive(true);
  };

  const handleFormBlur = () => {
    if (formValue === '') {
      setFormActive(false);
    }
  };

  const handleFormCancel = () => {
    setFormActive(false);
    setFormValue('');
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    const data = await mutationState.mutate({
      videoId,
      payload: {
        content: formValue,
      },
    });
    setFormActive(false);
    setFormValue('');
    if (data.payload && !data.error) {
      setSubmittedComments([data.payload, ...submittedComments]);
    }
  };

  return {
    ...queryState,
    sort,
    page,
    count,
    comments,
    hasMore,
    setPage,
    setCount,
    setComments,
    onSort: handleSort,
    onNext: handleNext,
    formValue,
    formActive,
    formLoading: mutationState.loading,
    submittedComments,
    onFormChange: handleFormChange,
    onFormFocus: handleFormFocus,
    onFormBlur: handleFormBlur,
    onFormCancel: handleFormCancel,
    onFormSubmit: handleFormSubmit,
  };
};
