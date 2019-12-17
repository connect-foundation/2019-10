import { useState, useEffect } from 'react';
import { useQuery, Action } from 'react-fetching-library';

const createVideoAction: Action = id => ({
  method: 'GET',
  endpoint: `${process.env.API_URL_HOST}/videos/${id}`,
  credentials: 'include',
});

export const useVideo = id => {
  const [hasData, setHasData] = useState(false);
  // TODO: 기본 값 model로 작성하기
  const [video, setVideo] = useState({
    id: '',
    views: null,
    createdAt: '',
    title: '',
    likedUsersCount: null,
    likedByUser: false,
    description: '',
    user: {
      id: '',
      username: '',
      avatar: '',
    },
  });
  const action = createVideoAction(id);
  const { payload, error, ...rest } = useQuery(action);

  useEffect(() => {
    if (payload && !error) {
      setHasData(true);
      setVideo(payload);
    }
  }, [payload, error]);

  return {
    video,
    hasData,
    ...rest,
  };
};
