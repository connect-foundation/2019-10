import { Action } from 'react-fetching-library';

export const makeGetPreSignedUrlAction: Action = (fileName: string) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: { fileName: `workspace/${fileName}` },
  endpoint: process.env.AUTH_LAMBDA_HOST,
});

export const makeUploadToBucketAction: Action = ({ preSignedUrl, file }) => ({
  method: 'PUT',
  body: file,
  headers: {
    'Content-Type': 'video/*',
  },
  endpoint: preSignedUrl,
});

export const makeSendVideoInfoAction: Action = uploadVideoDTO => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: uploadVideoDTO,
  endpoint: process.env.VIDEO_UPLOAD_API_SERVER_URL,
});
