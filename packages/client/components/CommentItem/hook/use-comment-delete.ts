import { useState } from 'react';
import { useMutation } from 'react-fetching-library';
import { makeDeleteCommentAction } from '../action/make-delete-comment-action';

export const useCommentDelete = (videoId, commentId) => {
  const [deleted, setDeleted] = useState(false);
  const mutationState = useMutation(makeDeleteCommentAction);

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
