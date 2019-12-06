import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

import * as S from './styles';
import { orientation } from '../../constants';

const VideoItemSkeleton = ({
  mobileType = orientation.vertical,
  desktopType = orientation.vertical,
  showUser = true,
}) => {
  return (
    <S.VideoItem mobileType={mobileType} desktopType={desktopType}>
      <a>
        <S.ThumbnailSkeleton mobileType={mobileType} desktopType={desktopType}>
          <Skeleton variant="rect" />
        </S.ThumbnailSkeleton>
      </a>
      <S.Details mobileType={mobileType} desktopType={desktopType}>
        {showUser && (
          <a>
            <S.AvatarSkeleton>
              <Skeleton variant="circle" />
            </S.AvatarSkeleton>
          </a>
        )}
        <S.Info>
          <a>
            <S.TitleSkeleton>
              <Skeleton />
            </S.TitleSkeleton>
          </a>
          {showUser && (
            <a>
              <S.UsernameSkeleton>
                <Skeleton />
              </S.UsernameSkeleton>
            </a>
          )}
          <a>
            <S.AdditionalsSkeleton>
              <Skeleton />
            </S.AdditionalsSkeleton>
          </a>
        </S.Info>
      </S.Details>
    </S.VideoItem>
  );
};

export default VideoItemSkeleton;
