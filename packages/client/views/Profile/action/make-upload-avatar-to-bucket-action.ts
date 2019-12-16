import { Action } from 'react-fetching-library';

export const makeUploadAvatarToBucketAction: Action = ({
  preSignedUrl,
  file,
}) => ({
  method: 'PUT',
  body: file,
  headers: {
    'Content-Type': 'image/*',
  },
  endpoint: preSignedUrl,
});
