import { useReducer } from 'react';
import { VIDEO_FILE_ACTIONS } from '../../constants';
import { VideoFileDispatchContext, VideoFileStateContext } from './contexts';

const reducer = (state, action) => {
  switch (action.type) {
    case VIDEO_FILE_ACTIONS.UPLOAD:
      return action.file;
    case VIDEO_FILE_ACTIONS.COMPLETE:
      return {};
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const VideoFileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});

  return (
    <VideoFileDispatchContext.Provider value={dispatch}>
      <VideoFileStateContext.Provider value={state}>
        {children}
      </VideoFileStateContext.Provider>
    </VideoFileDispatchContext.Provider>
  );
};
