import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';

import * as S from './styles';

interface VideoPlayerProps {
  src: string;
  autoPlay?: boolean;
  width?: string;
  height?: string;
}

const VideoPlayer: React.FunctionComponent<VideoPlayerProps> = (
  { src, autoPlay = true, width, height },
  ref,
) => {
  const uiContainerRef = useRef(null);
  const videoRef = useRef(null);
  const controllerRef = useRef({
    player: null,
    videoElement: null,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const shaka = require('shaka-player');
      const player = new shaka.Player(videoRef.current);
      controllerRef.current = {
        player,
        videoElement: videoRef.current,
      };
    }
  }, []);

  useEffect(() => {
    const { player } = controllerRef.current;
    if (player) {
      player.load(src);
    }
  }, [src]);

  return (
    <S.VideoPlayer ref={uiContainerRef}>
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        width={width}
        height={height}
        controls
      />
    </S.VideoPlayer>
  );
};

export default React.forwardRef(VideoPlayer);
