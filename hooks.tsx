import { useVideoFileDispatch } from '../../components/FileProvider/hooks';
import { useRef } from 'react';
import { fileActions, fileType, endpoint } from '../../constants';
import { useRouter } from 'next/router';

export const useVideoFileUpload = () => {
  const fileDispatch = useVideoFileDispatch();
  const Videoinput = useRef<HTMLInputElement>();
  const router = useRouter();

  const showExplorer = e => {
    Videoinput.current.click();
  };

  const changeVideo = e => {
    const currentFile = Videoinput.current.files[0];

    if (!currentFile || !isVideo(currentFile.type)) {
      return;
    }

    fileDispatch({
      type: fileActions.upload,
      file: currentFile ? currentFile : {},
    });

    router.push(endpoint.uploadVideoDetail);
  };

  return {
    Videoinput,
    showExplorer,
    changeVideo,
  };
};

function isVideo(type: string) {
  return type.includes(fileType.video);
}
