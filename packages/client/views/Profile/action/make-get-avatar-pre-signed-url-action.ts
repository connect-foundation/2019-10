import { Action } from 'react-fetching-library';

export const makeGetAvatarPreSignedURLAction: Action = (path: string) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: { fileName: `workspace/${path}` },
  endpoint: process.env.AVATAR_UPLOAD_PRESIGNED_URL_PATH,
});
