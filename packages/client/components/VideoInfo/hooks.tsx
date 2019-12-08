import { Action, useMutation } from 'react-fetching-library';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../UserProvider/hooks';

const likeVideoAction: Action = videoId => ({
  method: 'POST',
  endpoint: `${process.env.API_URL_HOST}/videos/${videoId}/likes`,
  credentials: 'include',
});

const unlikeVideoAction: Action = videoId => ({
  method: 'DELETE',
  endpoint: `${process.env.API_URL_HOST}/videos/${videoId}/likes`,
  credentials: 'include',
});

export const useVideoLike = (likedUsersCount: number, likedByUser: boolean) => {
  const router = useRouter();
  const { videoId } = router.query;

  const user = useUser();

  const [likesCount, setLikesCount] = useState(likedUsersCount);
  const [liked, setLiked] = useState(likedByUser);

  useEffect(() => {
    setLikesCount(likedUsersCount);
  }, [likedUsersCount]);

  useEffect(() => {
    setLiked(likedByUser);
  }, [likedByUser]);

  const {
    error: likeError,
    mutate: likeMutate,
    reset: likeReset,
  } = useMutation(likeVideoAction);
  const {
    error: unlikeError,
    mutate: unlikeMutate,
    reset: unlikeReset,
  } = useMutation(unlikeVideoAction);

  useEffect(() => {
    if (likeError || unlikeError) {
      setLikesCount(likedUsersCount);
      setLiked(likedByUser);
      likeReset();
      unlikeReset();
    }
  }, [likeError, unlikeError]);

  const handleClick = () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    setLiked(!liked);
    if (liked) {
      unlikeMutate(videoId);
      setLikesCount(likesCount - 1);
    } else {
      likeMutate(videoId);
      setLikesCount(likesCount + 1);
    }
  };

  return {
    likesCount,
    liked,
    onLike: handleClick,
  };
};
