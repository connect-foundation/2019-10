import React from 'react';

import * as S from './styles';
import CommentItem from '../CommentItem';

const CommentList = ({ comments }) => {
  return (
    <S.CommentList>
      {comments.map(comment => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </S.CommentList>
  );
};

export default CommentList;
