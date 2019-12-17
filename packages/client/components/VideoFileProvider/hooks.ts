import { useContext } from 'react';

import { VideoFileStateContext, VideoFileDispatchContext } from './contexts';

export const useVideoFile = () => useContext(VideoFileStateContext);
export const useVideoFileDispatch = () => useContext(VideoFileDispatchContext);
