import { useVideoFileDispatch } from '../../../components/VideoFileProvider/hooks';
import { useRef } from 'react';
import { VIDEO_FILE_ACTIONS, fileType, endpoint } from '../../../constants';
import { useRouter } from 'next/router';

export const useVideoSelection = () => {
  const fileDispatch = useVideoFileDispatch();
  const videoinput = useRef<HTMLInputElement>();
  const router = useRouter();

  const showExplorer = e => {
    videoinput.current.click();
  };

  const changeVideo = e => {
    const currentFile = videoinput.current.files[0];

    if (!currentFile || !isVideo(currentFile.type)) {
      return;
    }

    fileDispatch({
      type: VIDEO_FILE_ACTIONS.UPLOAD,
      file: currentFile ? currentFile : null,
    });

    router.push(endpoint.uploadVideoDetail);
  };

  return {
    Videoinput: videoinput,
    showExplorer,
    changeVideo,
  };
};

function isVideo(type: string) {
  return type.includes(fileType.video);
}
