import React from 'react';

import * as S from './styles';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

const VideoItem = ({
  id,
  title,
  description,
  like,
  hit,
  sourceUrl,
  thumbnail,
  playtime,
  user,
  tags,
  likedUsers,
  comments,
  showUser = true,
  mobileType = 'vertical',
  desktopType = 'vertical',
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/videos/[videoId]', `/videos/${id}`);
  };

  return (
    <S.VideoItem
      onClick={handleClick}
      mobileType={mobileType}
      desktopType={desktopType}
    >
      <Link href="/videos/[videoId]" as={`/videos/${id}`}>
        <a onClick={e => e.stopPropagation()}>
          <S.Thumbnail mobileType={mobileType} desktopType={desktopType}>
            <img src={thumbnail} />
          </S.Thumbnail>
        </a>
      </Link>
      <S.Details mobileType={mobileType} desktopType={desktopType}>
        {showUser && (
          <Link href="/users/[userId]" as={`/users/1`}>
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
            <Link href="/users/[userId]" as={`/users/1`}>
              <a onClick={e => e.stopPropagation()}>
                <S.Username>{user.username}</S.Username>
              </a>
            </Link>
          )}
          <S.Additionals>
            <span>조회 수 {hit}</span>
            <span> · </span>
            <span>{3}일전</span>
          </S.Additionals>
        </S.Info>
      </S.Details>
    </S.VideoItem>
  );
};

export default VideoItem;
