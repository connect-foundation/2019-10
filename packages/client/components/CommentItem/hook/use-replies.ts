import { useState, useEffect } from 'react';
import { makeQueryRepliesAction } from '../action/make-query-replies-action';
import { useQuery, useMutation } from 'react-fetching-library';
import { makeCreateReplyAction } from '../action/make-create-reply-action';

export const useReplies = (videoId, commentId) => {
  // replies
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [replies, setReplies] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // form
  const [formValue, setFormValue] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [submittedReplies, setSubmittedReplies] = useState([]);

  const action = makeQueryRepliesAction(videoId, commentId, page);
  const queryState = useQuery(action, false);
  const mutationState = useMutation(makeCreateReplyAction);

  useEffect(() => {
    if (!open) {
      return;
    }
    const fetch = async () => {
      const data = await queryState.query();
      if (data.payload && !data.error) {
        setCount(data.payload.count);
        setSubmittedReplies([]);
        setReplies(data.payload.data);
        setHasMore(data.payload.data.length >= 5);
      }
    };
    fetch();
  }, [open]);

  useEffect(() => {
    if (page <= 1) {
      return;
    }
    const fetch = async () => {
      const data = await queryState.query();
      if (data.payload && !data.error) {
        setCount(data.payload.count);
        setReplies([...replies, ...data.payload.data]);
        setHasMore(data.payload.data.length >= 5);
      }
    };
    fetch();
  }, [page]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const handleFormOpen = () => {
    setFormOpen(true);
  };

  const handleFormChange = e => {
    setFormValue(e.target.value);
  };

  const handleFormCancel = () => {
    setFormOpen(false);
  };

  const handleFormSubmit = async e => {
    e.preventDefault();
    const data = await mutationState.mutate({
      videoId,
      commentId,
      payload: {
        content: formValue,
      },
    });
    setFormOpen(false);
    setFormValue('');
    if (data.payload && !data.error) {
      setSubmittedReplies([data.payload, ...submittedReplies]);
    }

    if (!open) {
      handleOpen();
    }
  };

  return {
    ...queryState,
    open,
    page,
    count,
    replies,
    hasMore,
    formValue,
    formOpen,
    formLoading: mutationState.loading,
    submittedReplies,
    onOpen: handleOpen,
    onNext: handleNext,
    onFormOpen: handleFormOpen,
    onFormChange: handleFormChange,
    onFormCancel: handleFormCancel,
    onFormSubmit: handleFormSubmit,
  };
};
