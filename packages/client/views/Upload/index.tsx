import React from 'react';
import uuidv4 from 'uuid/v4';
import { UploadedVideoInfo } from './dto/upload-video.dto';

const VideoUpload: React.FunctionComponent = () => {
  const fileInput = React.createRef<HTMLInputElement>();

  const uploadVideo = async e => {
    try {
      e.preventDefault();

      const file = fileInput.current.files[0];
      const id = uuidv4();
      const fileName = `${id}/${file.name}`;

      const preSignedUrl = await getPreSignedUrl(fileName);
      await uploadToBucket(preSignedUrl, file);
      await sendVideoInfo(
        new UploadedVideoInfo(id, 'title', 'description', 0, ['tag1', 'tag2']),
      );
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={uploadVideo}>
        <input type="file" ref={fileInput} />
        <input type="submit" />
      </form>
    </>
  );
};

const getPreSignedUrl = async (fileName): Promise<string> => {
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileName: `workspace/${fileName}` }),
  };

  const response = await fetch(process.env.AUTH_LAMBDA_HOST, option);
  const url = await response.json();

  return url;
};

const uploadToBucket = async (preSignedUrl, file): Promise<boolean> => {
  const option = {
    method: 'PUT',
    body: file,
  };

  const response = await fetch(preSignedUrl, option);

  return response.ok;
};

const sendVideoInfo = async (videoInfo: UploadedVideoInfo) => {
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(videoInfo),
  };

  const response = await fetch(process.env.VIDEO_UPLOAD_API_SERVER_URL, option);
  const video = await response.json();

  return video;
};

export default VideoUpload;
