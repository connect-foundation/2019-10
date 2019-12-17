import { useState, useEffect } from 'react';
import { Action, useQuery } from 'react-fetching-library';

const createRepliesAction: Action = (videoId, commentId, page) => ({
  method: 'GET',
  endpoint: `${process.env.API_SERVER_URL}/videos/${videoId}/comments/${commentId}/replies?page=${page}`,
});

export const useReplies = (videoId, commentId) => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [replies, setReplies] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const action = createRepliesAction(videoId, commentId, page);
  const { payload, error, query, ...rest } = useQuery(action, false);

  useEffect(() => {
    if (payload && !error) {
      setHasData(true);
      setHasMore(payload.data.length >= 5);
      setReplies([...replies, ...payload.data]);
    }
  }, [payload, error]);

  useEffect(() => {
    if (open) {
      query();
    }
  }, [open]);

  useEffect(() => {
    if (page !== 1) {
      query();
    }
  }, [page]);

  return {
    replies,
    open,
    hasData,
    hasMore,
    loading: rest.loading,
    onNext: () => setPage(page + 1),
    onOpen: () => setOpen(true),
  };
};

export const useReplyForm = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    return null;
  };

  return {
    open,
    value,
    onOpen: handleOpen,
    onChange: handleChange,
    onCancel: handleCancel,
    onSubmit: handleSubmit,
  };
};
