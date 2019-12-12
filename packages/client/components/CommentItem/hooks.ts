import { Action, useQuery, useMutation } from 'react-fetching-library';
import { useState, useEffect } from 'react';

const getRepliesAction: Action = (videoId, commentId, page) => ({
  method: 'GET',
  endpoint: `${process.env.API_URL_HOST}/videos/${videoId}/comments/${commentId}/replies?page=${page}`,
  credentials: 'include',
});

const createReplyAction: Action = ({ videoId, commentId, payload }) => ({
  method: 'POST',
  endpoint: `${process.env.API_URL_HOST}/videos/${videoId}/comments/${commentId}`,
  credentials: 'include',
  body: payload,
});

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

  const action = getRepliesAction(videoId, commentId, page);
  const queryState = useQuery(action, false);
  const mutationState = useMutation(createReplyAction);

  useEffect(() => {
    if (open) {
      const fetch = async () => {
        const data = await queryState.query();
        if (data.payload && !data.error) {
          setCount(data.payload.count);
          setReplies(data.payload.data);
          setHasMore(data.payload.data.length >= 5);
        }
      };
      fetch();
    }
  }, [open]);

  useEffect(() => {
    if (page > 1) {
      const fetch = async () => {
        const data = await queryState.query();
        if (data.payload && !data.error) {
          setCount(data.payload.count);
          setReplies([...replies, ...data.payload.data]);
          setHasMore(data.payload.data.length >= 5);
        }
      };
      fetch();
    }
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

const editCommentAction: Action = ({ videoId, commentId, payload }) => ({
  method: 'PATCH',
  endpoint: `${process.env.API_URL_HOST}/videos/${videoId}/comments/${commentId}`,
  credentials: 'include',
  body: payload,
});

export const useCommentEdit = (videoId, commentId, content) => {
  const [edit, setEdit] = useState(false);
  const [editedComment, setEditedComment] = useState();

  const [formValue, setFormValue] = useState(content);

  const mutationState = useMutation(editCommentAction);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleFormChange = e => {
    setFormValue(e.target.value);
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
    setEdit(false);

    if (data.payload && !data.error) {
      setFormValue(data.payload.content);
      setEditedComment(data.payload.content);
    }
  };

  return {
    edit,
    editedComment,
    formValue,
    formLoading: mutationState.loading,
    onEdit: handleEdit,
    onFormChange: handleFormChange,
    onFormSubmit: handleFormSubmit,
  };
};

const deleteCommentAction: Action = ({ videoId, commentId }) => ({
  method: 'DELETE',
  endpoint: `${process.env.API_URL_HOST}/videos/${videoId}/comments/${commentId}`,
  credentials: 'include',
});

export const useCommentDelete = (videoId, commentId) => {
  const [deleted, setDeleted] = useState(false);
  const mutationState = useMutation(deleteCommentAction);

  const handleDelete = async () => {
    const confirm = window.confirm('정말로 삭제하시겠습니까?');
    if (confirm) {
      await mutationState.mutate({
        videoId,
        commentId,
      });
      setDeleted(true);
    }
  };

  return {
    deleted,
    onDelete: handleDelete,
  };
};
