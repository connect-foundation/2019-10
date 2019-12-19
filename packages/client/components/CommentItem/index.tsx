import { useRouter } from 'next/router';

import { format } from '../../libs/timeago';

import * as S from './style';
import { FavoriteSVG } from '../../svgs';
import { CircularProgress } from '@material-ui/core';
import { useUser } from '../UserProvider/hooks';

import CommentForm from '../CommentForm';
import { useCommentUpdate } from './hook/use-comment-update';
import { useCommentDelete } from './hook/use-comment-delete';
import { useReplies } from './hook/use-replies';
import { useCommentLike } from './hook/use-comment-like';

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

  let myComment = false;
  if (loggedInUser) {
    myComment = user.id === loggedInUser.userId;
  }

  const {
    update,
    formLoading,
    formValue,
    updatedComment,
    onFormChange,
    onUpdate,
    onFormSubmit,
  } = useCommentUpdate(videoId, id, content);
  const { deleted, onDelete } = useCommentDelete(videoId, id);
  const repliesState = useReplies(videoId, id);

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

  if (deleted) {
    return null;
  }

  return (
    <S.CommentItem reply={reply}>
      <S.Avatar reply={reply}>
        <img src={user.avatar} />
      </S.Avatar>
      <S.Content>
        {update ? (
          <CommentForm
            // TODO: 스타일 내재화 하기
            style={{
              marginBottom: '0rem',
            }}
            rows={1}
            reply
            avatar={false}
            loading={formLoading}
            value={formValue}
            submitMessage="수정"
            onChange={onFormChange}
            onFocus={() => null}
            onBlur={() => null}
            onCancel={onUpdate}
            onSubmit={onFormSubmit}
          />
        ) : (
          <>
            <S.User>
              <span>{user.username}</span>
              <span className="dates-ago">{format(createdAt, 'ko')}</span>
            </S.User>
            <S.Description>{updatedComment.content || content}</S.Description>

            <S.Actions>
              <S.Like type="button" active={liked} onClick={onLike}>
                <FavoriteSVG />
                <span>좋아요 {likesCount > 0 && `${likesCount}개`}</span>
              </S.Like>

              {!reply && (
                <>
                  <span className="dot">・</span>
                  <button onClick={repliesState.onFormOpen}>댓글 달기</button>
                </>
              )}

              {myComment && (
                <>
                  <span className="dot">・</span>
                  <button
                    onClick={() => {
                      repliesState.onFormCancel();
                      onUpdate();
                    }}
                  >
                    수정
                  </button>
                  <span className="dot">・</span>
                  <button onClick={onDelete}>삭제</button>
                </>
              )}
            </S.Actions>
          </>
        )}

        {repliesState.formOpen && (
          <S.StyledCommentForm
            reply
            rows={1}
            loading={repliesState.formLoading}
            value={repliesState.formValue}
            onChange={repliesState.onFormChange}
            onCancel={repliesState.onFormCancel}
            onSubmit={repliesState.onFormSubmit}
          />
        )}

        {childrenCount > 0 && !repliesState.open && (
          <S.MoreRepliesButton>
            <button type="button" onClick={repliesState.onOpen}>
              <S.StyledSubdirectoryArrowRightSVG />
              <span>댓글 {childrenCount}개 더 보기</span>
            </button>
          </S.MoreRepliesButton>
        )}

        {repliesState.open && (
          <S.Replies>
            {repliesState.submittedReplies.map(replyComment => (
              <CommentItem key={replyComment.id} reply {...replyComment} />
            ))}
            {repliesState.replies.map(replyComment => {
              return (
                <CommentItem key={replyComment.id} reply {...replyComment} />
              );
            })}
            {repliesState.loading
              ? loader
              : repliesState.hasMore && (
                  <S.LoadMoreRepliesButton>
                    <button type="button" onClick={repliesState.onNext}>
                      <S.StyledArrowDropDownSVG />
                      <span>댓글 더 불러오기</span>
                    </button>
                  </S.LoadMoreRepliesButton>
                )}
          </S.Replies>
        )}
      </S.Content>
    </S.CommentItem>
  );
};

export default CommentItem;
