import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { format } from '../../libs/timeago';

import * as S from './styles';
import { FavoriteSVG } from '../../svgs';
import { useReplies, useReplyForm, useCommentLike } from './hooks';
import { CircularProgress } from '@material-ui/core';
import { useUser } from '../UserProvider/hooks';

const CommentItem = ({
  reply,
  id,
  content,
  likedUsersCount,
  childrenCount,
  user,
  createdAt,
  updatedAt,
  likedByUser,
}) => {
  const router = useRouter();
  const { videoId } = router.query;

  const loggedInUser = useUser();

  const myComment = user.id === loggedInUser.id;

  const {
    open: formOpen,
    value,
    onOpen: onFormOpen,
    onChange,
    onCancel,
    onSubmit,
  } = useReplyForm();

  const {
    replies,
    open: repliesOpen,
    hasData,
    hasMore,
    loading,
    onNext,
    onOpen: onRepliesOpen,
  } = useReplies(videoId, id);

  const { likesCount, liked, onLike } = useCommentLike(
    videoId,
    id,
    likedUsersCount,
    likedByUser,
    loggedInUser,
    router,
  );

  const loader = (
    <S.Loader>
      <CircularProgress thickness={4} />
    </S.Loader>
  );

  return (
    <S.CommentItem reply={reply}>
      <S.Avatar reply={reply}>
        <img src={user.avatar} />
      </S.Avatar>
      <S.Content>
        <S.User>
          <span>{user.username}</span>
          <span className="dates-ago">{format(createdAt, 'ko')}</span>
        </S.User>
        <S.Description>{content}</S.Description>

        <S.Actions>
          <S.Like type="button" active={liked} onClick={onLike}>
            <FavoriteSVG />
            <span>좋아요 {likesCount > 0 && `${likesCount}개`}</span>
          </S.Like>

          {!reply && (
            <>
              <span className="dot">・</span>
              <button onClick={onFormOpen}>댓글 달기</button>
            </>
          )}

          {myComment && (
            <>
              <span className="dot">・</span>
              <button>수정</button>
              <span className="dot">・</span>
              <button>삭제</button>
            </>
          )}
        </S.Actions>

        {formOpen && (
          <S.StyledCommentForm
            reply
            rows={1}
            value={value}
            onChange={onChange}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        )}

        {childrenCount !== 0 && !repliesOpen && (
          <S.MoreRepliesButton>
            <button type="button" onClick={onRepliesOpen}>
              <S.StyledSubdirectoryArrowRightSVG />
              <span>댓글 {childrenCount}개 더 보기</span>
            </button>
          </S.MoreRepliesButton>
        )}

        {repliesOpen && (
          <S.Replies>
            {hasData ? (
              <>
                {replies.map(replyComment => {
                  return (
                    <CommentItem
                      key={replyComment.id}
                      reply
                      {...replyComment}
                    />
                  );
                })}
                {hasMore ? (
                  loading ? (
                    loader
                  ) : (
                    <S.LoadMoreRepliesButton>
                      <button type="button" onClick={onNext}>
                        <S.StyledArrowDropDownSVG />
                        <span>댓글 더 불러오기</span>
                      </button>
                    </S.LoadMoreRepliesButton>
                  )
                ) : null}
              </>
            ) : (
              loader
            )}
          </S.Replies>
        )}
      </S.Content>
    </S.CommentItem>
  );
};

export default CommentItem;
