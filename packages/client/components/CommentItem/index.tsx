import React from 'react';
import { useRouter } from 'next/router';

import { format } from '../../libs/timeago';

import * as S from './styles';
import {
  FavoriteSVG,
  ArrowDropDownSVG,
  SubdirectoryArrowRightSVG,
} from '../../svgs';
import { useReplies } from './hooks';
import { CircularProgress } from '@material-ui/core';

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

  const {
    replies,
    open,
    hasData,
    hasMore,
    loading,
    onNext,
    onOpen,
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

            {likedUsersCount !== 0 && (
              <span className="likes">{likedUsersCount}</span>
            )}
          </button>

          {!reply && (
            <>
              <span className="dot">・</span>
              <button>댓글 달기</button>
            </>
          )}

          <span className="dot">・</span>
          <button>수정</button>
          <span className="dot">・</span>
          <button>삭제</button>
        </S.Actions>

        {childrenCount !== 0 && !open && (
          <S.MoreRepliesButton>
            <button type="button" onClick={onOpen}>
              <S.StyledSubdirectoryArrowRightSVG />
              <span>댓글 {childrenCount}개 더 보기</span>
            </button>
          </S.MoreRepliesButton>
        )}

        {open && (
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
