import { useState, useEffect } from 'react';
import { useQuery, Action, useMutation } from 'react-fetching-library';
import { makeIncreaseViewAction } from './action/make-increase-view-action';

const createVideoAction: Action = id => ({
  method: 'GET',
  endpoint: `${process.env.API_SERVER_URL}/videos/${id}`,
});

export const useVideo = id => {
  const [hasData, setHasData] = useState(false);
  // TODO: 기본 값 model로 작성하기
  const [video, setVideo] = useState({
    id: '',
    title: '',
    description: '',
    likedUsersCount: null,
    views: null,
    source: null,
    thumbnail: null,
    playtime: null,
    createdAt: '',
    likedByUser: false,
    user: {
      id: '',
      username: '',
      avatar: '',
    },
  });
  const action = createVideoAction(id);
  const { payload: receivedVideo, error, ...rest } = useQuery(action);
  const { mutate: mutateIncreaseView } = useMutation(makeIncreaseViewAction);

  useEffect(() => {
    if (!receivedVideo || error) {
      return;
    }

    setHasData(true);
    setVideo(receivedVideo);

    // TODO
    // will be deprecated
    const delay = (receivedVideo.playtime / 2) * 1000;
    const increaseViews = async () => {
      await mutateIncreaseView(receivedVideo.id);
    };

    const timer = setTimeout(() => {
      increaseViews();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [receivedVideo, error]);

  return {
    video,
    hasData,
    ...rest,
  };
};
