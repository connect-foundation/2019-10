import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { format } from '../../libs/timeago';

import * as S from './styles';
import {
  FavoriteSVG,
  ArrowDropDownSVG,
  SubdirectoryArrowRightSVG,
} from '../../svgs';
import { useReplies, useReplyForm } from './hooks';
import { CircularProgress } from '@material-ui/core';
import CommentForm from '../CommentForm';

const CommentItem = ({
  reply,
  id,
  content,
  likedUsersCount,
  childrenCount,
  user,
  createdAt,
  updatedAt,
}) => {
  const router = useRouter();
  const { videoId } = router.query;

  // TODO: refactor to an actual data
  const myComment = false;

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
          <button type="button">
            <FavoriteSVG />

            <span className="likes">
              좋아요 {likedUsersCount !== 0 && `${likedUsersCount}개`}
            </span>
          </button>

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
