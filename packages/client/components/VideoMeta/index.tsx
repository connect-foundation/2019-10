import React from 'react';
import Link from 'next/link';

import * as S from './styles';
import VideoMetaSkeleton from './skeleton';
import { endpoint } from '../../constants';

const VideoMeta = ({ skeleton, username, userId, avatar, description }) => {
  return skeleton ? (
    <VideoMetaSkeleton />
  ) : (
    <S.VideoMeta>
      <S.User>
        <Link
          href={`${endpoint.users}/[userId]`}
          as={`${endpoint.users}/${userId}`}
        >
          <img src={avatar} />
        </Link>
        <Link
          href={`${endpoint.users}/[userId]`}
          as={`${endpoint.users}/${userId}`}
        >
          <span>{username}</span>
        </Link>
      </S.User>
      <S.Description>{description}</S.Description>
    </S.VideoMeta>
  );
};
export default VideoMeta;
