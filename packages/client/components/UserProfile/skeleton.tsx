import React from 'react';

import * as S from './styles';
import Skeleton from '@material-ui/lab/Skeleton';

const UserProfileSkeleton = () => {
  return (
    <S.UserProfile>
      <S.Content>
        <S.AvatarSkeleton>
          <Skeleton variant="circle" />
        </S.AvatarSkeleton>
        <S.InfoSkeleton>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </S.InfoSkeleton>
      </S.Content>
    </S.UserProfile>
  );
};

export default UserProfileSkeleton;
