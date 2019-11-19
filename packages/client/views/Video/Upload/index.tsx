import React from 'react';

const VideoUpload: React.FunctionComponent = () => {
  const fileInput = React.createRef<HTMLInputElement>();

  const uploadVideo = async e => {
    e.preventDefault();

    const file = fileInput.current.files[0];
    const fileName = file.name;

    const preSignedUrl = await getPreSignedUrl(fileName);
    uploadToBucket(preSignedUrl, file);
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

const getPreSignedUrl = async fileName => {
  const response = await fetch(process.env.AUTH_LAMBDA_HOST, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileName }),
  });

  const url = await response.json();
  return url;
};

const uploadToBucket = async (preSignedUrl, file) => {
  const option = {
    method: 'PUT',
    body: file,
  };

  await fetch(preSignedUrl, option);
};

export default VideoUpload;
