import Skeleton from '@material-ui/lab/Skeleton';

import * as S from './styles';

const VideoInfoSkeleton = () => {
  return (
    <S.VideoInfo>
      <S.ViewsAndDatesSkeleton>
        <Skeleton />
      </S.ViewsAndDatesSkeleton>
      <S.TitleSkeleton>
        <Skeleton />
      </S.TitleSkeleton>
      <S.TagsSkeleton>
        <Skeleton variant="rect" />
        <Skeleton variant="rect" />
      </S.TagsSkeleton>
      <S.LikeSkeleton>
        <Skeleton variant="circle" />
        <Skeleton />
      </S.LikeSkeleton>
    </S.VideoInfo>
  );
};

export default VideoInfoSkeleton;
