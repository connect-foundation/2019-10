import { useState } from 'react';
import { useMutation } from 'react-fetching-library';
import { makeUpdateCommentAction } from '../action/make-update-comment-action';

export const useCommentUpdate = (videoId, commentId, content) => {
  const [edit, setEdit] = useState(false);
  const [editedComment, setEditedComment] = useState();

  const [formValue, setFormValue] = useState(content);

  const mutationState = useMutation(makeUpdateCommentAction);

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
