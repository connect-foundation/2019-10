import { useState, useEffect } from 'react';
import { Action, useQuery, useMutation } from 'react-fetching-library';

import { makeLikeCommentAction } from '../action/make-like-comment-action';
import { makeUnlikeCommentAction } from '../action/make-unlike-comment-action';

export const useCommentLike = (
  videoId,
  commentId,
  likedUsersCount,
  likedByUser,
  user,
  router,
) => {
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
  } = useMutation(makeLikeCommentAction);
  const {
    error: unlikeError,
    mutate: unlikeMutate,
    reset: unlikeReset,
  } = useMutation(makeUnlikeCommentAction);

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
      unlikeMutate({ videoId, commentId });
      setLikesCount(likesCount - 1);
    } else {
      likeMutate({ videoId, commentId });
      setLikesCount(likesCount + 1);
    }
  };

  return {
    likesCount,
    liked,
    onLike: handleClick,
  };
};
