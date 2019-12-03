import React from 'react';
import moment from 'moment';
import Skeleton from '@material-ui/lab/Skeleton';

import * as S from './styles';
import VideoInfoSkeleton from './skeleton';

import { FavoriteSVG } from '../../svgs';

const VideoInfo = ({ skeleton, views, createdAt, title, likedUsersCount }) => {
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

      <S.Like>
        <div>
          <FavoriteSVG />
        </div>
        <span>
          좋아요 {likedUsersCount === 0 ? '' : `${likedUsersCount}개`}
        </span>
      </S.Like>
    </S.VideoInfo>
  );
};

export default VideoInfo;
