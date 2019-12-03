import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import * as S from './styles';

const VideoMetaSkeleton = () => {
  return (
    <S.VideoMeta>
      <S.UserSkeleton>
        <Skeleton variant="circle" />
        <Skeleton />
      </S.UserSkeleton>
      <S.DescriptionSkeleton>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </S.DescriptionSkeleton>
    </S.VideoMeta>
  );
};

export default VideoMetaSkeleton;
