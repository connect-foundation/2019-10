import React from 'react';

import * as S from './styles';
import { FavoriteSVG } from '../../svgs';

const VideoInfo = () => {
  return (
    <S.VideoInfo>
      <S.ViewsAndDates>
        <span>조회 수 3,621</span>
        <span className="dot">・</span>
        <span>2019년 12월 25일</span>
      </S.ViewsAndDates>
      <S.Title>파이썬은 왜 이렇게 느린걸까?</S.Title>
      <S.Tags>
        <S.Tag>python</S.Tag>
        <S.Tag>whyPythonIsSlow</S.Tag>
      </S.Tags>
      <S.Like>
        <div>
          <FavoriteSVG />
        </div>
        <span>좋아요 11개</span>
      </S.Like>
    </S.VideoInfo>
  );
};

export default VideoInfo;
