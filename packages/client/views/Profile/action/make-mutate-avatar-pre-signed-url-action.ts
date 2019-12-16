import { Action } from 'react-fetching-library';

export const makeMutateAvatarPreSignedURLAction: Action = (path: string) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: { fileName: `workspace/${path}` },
  endpoint: process.env.AVATAR_AUTH_LAMBDA_HOST,
});
