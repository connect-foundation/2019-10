import { useState, useEffect } from 'react';
import { Action, useQuery, useMutation } from 'react-fetching-library';

const getRepliesAction: Action = (videoId, commentId, page) => ({
  method: 'GET',
  endpoint: `${process.env.API_URL_HOST}/videos/${videoId}/comments/${commentId}/replies?page=${page}`,
  credentials: 'include',
});

export const useReplies = (videoId, commentId) => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [replies, setReplies] = useState([]);
  const [hasData, setHasData] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const action = getRepliesAction(videoId, commentId, page);
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

const likeCommentAction: Action = ({ videoId, commentId }) => ({
  method: 'POST',
  endpoint: `${process.env.API_URL_HOST}/videos/${videoId}/comments/${commentId}/likes`,
  credentials: 'include',
});

const unlikeCommentAction: Action = ({ videoId, commentId }) => ({
  method: 'DELETE',
  endpoint: `${process.env.API_URL_HOST}/videos/${videoId}/comments/${commentId}/likes`,
  credentials: 'include',
});

export const useCommentLike = (
  videoId,
  commentId,
  likedUsersCount,
  likedByUser,
  user,
  router,
) => {
  const [likesCount, setLikesCount] = useState(likedUsersCount);
  const [liked, setLiked] = useState(likedByUser);

  useEffect(() => {
    setLikesCount(likedUsersCount);
  }, [likedUsersCount]);

  useEffect(() => {
    setLiked(likedByUser);
  }, [likedByUser]);

  const {
    error: likeError,
    mutate: likeMutate,
    reset: likeReset,
  } = useMutation(likeCommentAction);
  const {
    error: unlikeError,
    mutate: unlikeMutate,
    reset: unlikeReset,
  } = useMutation(unlikeCommentAction);

  useEffect(() => {
    if (likeError || unlikeError) {
      setLikesCount(likedUsersCount);
      setLiked(likedByUser);
      likeReset();
      unlikeReset();
    }
  }, [likeError, unlikeError]);

  const handleClick = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    setLiked(!liked);
    if (liked) {
      unlikeMutate({ videoId, commentId });
      setLikesCount(likesCount - 1);
    } else {
      likeMutate({ videoId, commentId });
      setLikesCount(likesCount + 1);
    }
  };

  return {
    likesCount,
    liked,
    onLike: handleClick,
  };
};
