import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { format } from '../../libs/timeago';

import * as S from './styles';
import VideoItemSkeleton from './skeleton';
import { ORIENTATION } from '../../constants';

const VideoItem = ({
  skeleton,
  id,
  title,
  views,
  thumbnail,
  playtime,
  createdAt,
  user,
  showUser = true,
  mobileType = ORIENTATION.VERTICAL,
  desktopType = ORIENTATION.VERTICAL,
}) => {
  const router = useRouter();
  const [thumbnailOrientation, setThumbnailOrientation] = useState(null);

  const handleClick = () => {
    router.push('/videos/[videoId]', `/videos/${id}`);
  };

  const handleImageLoad = e => {
    const { offsetWidth, offsetHeight } = e.target as HTMLImageElement;
    setThumbnailOrientation(
      offsetWidth > offsetHeight
        ? ORIENTATION.HORIZONTAL
        : ORIENTATION.VERTICAL,
    );
  };

  return skeleton ? (
    <VideoItemSkeleton
      mobileType={mobileType}
      desktopType={desktopType}
      showUser={showUser}
    />
  ) : (
    <S.VideoItem
      onClick={handleClick}
      mobileType={mobileType}
      desktopType={desktopType}
    >
      <Link href="/videos/[videoId]" as={`/videos/${id}`}>
        <a onClick={e => e.stopPropagation()}>
          <S.Thumbnail mobileType={mobileType} desktopType={desktopType}>
            <img
              src={thumbnail}
              style={{
                width:
                  thumbnailOrientation === ORIENTATION.HORIZONTAL
                    ? '100%'
                    : null,
                height:
                  thumbnailOrientation === ORIENTATION.VERTICAL ? '100%' : null,
              }}
              onLoad={handleImageLoad}
            />
            <div>{playtime}</div>
          </S.Thumbnail>
        </a>
      </Link>
      <S.Details mobileType={mobileType} desktopType={desktopType}>
        {showUser && (
          <Link href="/users/[userId]" as={`/users/${user.id}`}>
            <a onClick={e => e.stopPropagation()}>
              <S.Avatar>
                <img src={user.avatar} />
              </S.Avatar>
            </a>
          </Link>
        )}
        <S.Info>
          <Link href="/videos/[videoId]" as={`/videos/${id}`}>
            <a onClick={e => e.stopPropagation()}>
              <S.Title>{title}</S.Title>
            </a>
          </Link>
          {showUser && (
            <Link href="/users/[userId]" as={`/users/${user.id}`}>
              <a onClick={e => e.stopPropagation()}>
                <S.Username>{user.username}</S.Username>
              </a>
            </Link>
          )}
          <S.Additionals>
            <span>조회 수 {views}</span>
            <span> · </span>
            <span>{format(createdAt, 'ko')}</span>
          </S.Additionals>
        </S.Info>
      </S.Details>
    </S.VideoItem>
  );
};

export default VideoItem;
