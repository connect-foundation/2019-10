import React from 'react';
import moment from 'moment';

import * as S from './styles';
import VideoInfoSkeleton from './skeleton';

import { FavoriteSVG } from '../../svgs';
import { useVideoLike } from './hooks';

const VideoInfo = ({
  skeleton,
  views,
  createdAt,
  title,
  likedUsersCount,
  likedByUser,
}) => {
  const { likesCount, liked, onLike } = useVideoLike(
    likedUsersCount,
    likedByUser,
  );

  return skeleton ? (
    <VideoInfoSkeleton />
  ) : (
    <S.VideoInfo>
      <S.ViewsAndDates>
        <span>조회 수 {views}</span>
        <span className="dot">・</span>
        <span>{moment(createdAt).format('YYYY년 MM월 DD일')}</span>
      </S.ViewsAndDates>

      <S.Title>{title}</S.Title>

      <S.Tags>
        <S.Tag>python</S.Tag>
        <S.Tag>whyPythonIsSlow</S.Tag>
      </S.Tags>

      <S.Like type="button" active={liked} onClick={onLike}>
        <div>
          <FavoriteSVG />
        </div>
        <span>
          좋아요
          {likesCount && likesCount > 0 ? ` ${likesCount}개` : ''}
        </span>
      </S.Like>
    </S.VideoInfo>
  );
};

export default VideoInfo;
