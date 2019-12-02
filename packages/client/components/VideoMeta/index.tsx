import React from 'react';

import * as S from './styles';
import VideoMetaSkeleton from './skeleton';

const VideoMeta = ({ skeleton, username, avatar, description }) => {
  return skeleton ? (
    <VideoMetaSkeleton />
  ) : (
    <S.VideoMeta>
      <S.User>
        <img src={avatar} />
        <span>{username}</span>
      </S.User>
      <S.Description>{description}</S.Description>
    </S.VideoMeta>
  );
};
export default VideoMeta;
