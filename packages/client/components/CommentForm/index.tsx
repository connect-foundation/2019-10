import React from 'react';
import * as S from './styles';
import CircularLoader from '../CircularLoader';

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
      {/* TODO: 로그인 유저의 avatar로 변경하기 */}
      {avatar && (
        <S.User>
          <img src="https://www.pngkey.com/png/detail/193-1938385_-pikachu-avatar.png" />
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
