import React, { useEffect, useImperativeHandle, useRef } from 'react';

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
  const controller = useRef({
    player: null,
    videoElement: null,
  });

  let shaka;
  if (typeof window !== 'undefined') {
    shaka = require('shaka-player');
  }

  useEffect(() => {
    if (shaka) {
      const player = new shaka.Player(videoRef.current);
      controller.current = {
        player,
        videoElement: videoRef.current,
      };
    }
  }, []);

  useEffect(() => {
    const { player } = controller.current;
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
