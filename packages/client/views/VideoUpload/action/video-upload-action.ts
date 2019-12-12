import { Action } from 'react-fetching-library';

import { UploadVideoDetailDTO } from '../dto/upload-video-detail-dto';
import { SERVER_ENDPOINT } from '../../../constants';

export const makeGetPreSignedUrlAction: Action = (fileName: string) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: { fileName: `workspace/${fileName}` },
  endpoint: process.env.GET_PRESIGNED_URL_LAMBDA_URL,
});

export const makeUploadToBucketAction: Action = ({ preSignedUrl, file }) => ({
  method: 'PUT',
  body: file,
  headers: {
    'Content-Type': 'video/*',
  },
  endpoint: preSignedUrl,
});

export const makeSendVideoInfoAction: Action = (
  uploadVideoDetailDTO: UploadVideoDetailDTO,
) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: uploadVideoDetailDTO,
  endpoint: `${process.env.API_SERVER_HOST}${SERVER_ENDPOINT.VIDEO_UPLOAD}`,
  credentials: 'include',
});
