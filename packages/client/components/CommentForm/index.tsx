import React, { useState } from 'react';

import * as S from './styles';

const CommentForm = () => {
  const [value, setValue] = useState('');
  const [active, setActive] = useState(false);

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleFocus = () => {
    setActive(true);
  };

  const handleBlur = () => {
    if (value === '') {
      setActive(false);
    }
  };

  const handleCancel = () => {
    setActive(false);
    setValue('');
  };

  return (
    <S.CommentForm>
      <S.User>
        <img src="https://miro.medium.com/max/3150/1*n4VB9UbNNoB78-vGIhulag.jpeg" />
        <span>알렉스 권</span>
      </S.User>
      <S.Form onSubmit={() => null}>
        <textarea
          placeholder="댓글을 입력해 주세요."
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {active && (
          <div>
            <button type="button" onClick={handleCancel}>
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
