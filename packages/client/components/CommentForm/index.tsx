import React from 'react';

import * as S from './styles';
import CircularLoader from '../CircularLoader';
import { CircularProgress } from '@material-ui/core';

const CommentForm = ({
  rows = 1,
  reply = false,
  avatar = true,
  loading,
  value,
  active = reply,
  submitMessage = '등록',
  onChange,
  onFocus,
  onBlur,
  onCancel,
  onSubmit,
  ...rest
}) => {
  return (
    <S.CommentForm {...rest}>
      {avatar && (
        <S.User>
          <img src="https://miro.medium.com/max/3150/1*n4VB9UbNNoB78-vGIhulag.jpeg" />
        </S.User>
      )}
      <S.Form onSubmit={onSubmit}>
        <S.StyledTextarea
          rows={rows}
          placeholder="댓글을 입력해 주세요."
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />

        {active && (
          <div>
            <button type="button" onClick={onCancel}>
              취소
            </button>
            <button type="submit">
              {loading ? (
                <CircularLoader size={2} thickness={4} color="white" />
              ) : (
                submitMessage
              )}
            </button>
          </div>
        )}
      </S.Form>
    </S.CommentForm>
  );
};

export default CommentForm;
