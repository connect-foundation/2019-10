import React from 'react';

import * as S from './styles';

const CommentForm = ({
  rows = 1,
  reply = false,
  value,
  active = reply,
  onChange,
  onFocus,
  onBlur,
  onCancel,
  onSubmit,
  ...rest
}) => {
  return (
    <S.CommentForm {...rest}>
      <S.User>
        <img src="https://miro.medium.com/max/3150/1*n4VB9UbNNoB78-vGIhulag.jpeg" />
      </S.User>
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
            <button type="submit">등록</button>
          </div>
        )}
      </S.Form>
    </S.CommentForm>
  );
};

export default CommentForm;
