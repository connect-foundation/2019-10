import { useVideoFileDispatch } from '../../components/FileProvider/hooks';
import { useRef } from 'react';
import { fileActions, fileType, endpoint } from '../../constants';
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
      type: fileActions.upload,
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
