import { useState } from 'react';
import { useMutation } from 'react-fetching-library';
import { makeUpdateCommentAction } from '../action/make-update-comment-action';

export const useCommentUpdate = (videoId, commentId, content) => {
  const [update, setUpdate] = useState(false);
  const [updatedComment, setUpdatedComment] = useState({ content: '' });

  const [formValue, setFormValue] = useState(content);

  const mutationState = useMutation(makeUpdateCommentAction);

  const handleUpdate = () => {
    setUpdate(!update);
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
    setUpdate(false);

    if (data.payload && !data.error) {
      setFormValue(data.payload.content);
      setUpdatedComment({ content: data.payload.content });
    }
  };

  return {
    update,
    updatedComment,
    formValue,
    formLoading: mutationState.loading,
    onUpdate: handleUpdate,
    onFormChange: handleFormChange,
    onFormSubmit: handleFormSubmit,
  };
};
