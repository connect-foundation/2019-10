import { useReducer } from 'react';
import { fileActions } from '../../constants';
import { VideoFileDispatchContext, VideoFileStateContext } from './contexts';

const reducer = (state, action) => {
  switch (action.type) {
    case fileActions.upload:
      return action.file;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const FileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {});

  return (
    <VideoFileDispatchContext.Provider value={dispatch}>
      <VideoFileStateContext.Provider value={state}>
        {children}
      </VideoFileStateContext.Provider>
    </VideoFileDispatchContext.Provider>
  );
};
