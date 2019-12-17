import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-fetching-library';
import { makeLikeVideoAction } from '../action/make-like-video-action';
import { makeUnlikeVideoAction } from '../action/make-unlike-video-action';
import { useUser } from '../../UserProvider/hooks';
import { endpoint } from '../../../constants';

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
  } = useMutation(makeLikeVideoAction);
  const {
    error: unlikeError,
    mutate: unlikeMutate,
    reset: unlikeReset,
  } = useMutation(makeUnlikeVideoAction);

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
      router.push(endpoint.login);
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
