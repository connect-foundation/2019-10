import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import * as S from './styles';
import { sortOptions } from '../../constants';
import CommentForm from '../CommentForm';
import CommentItem from '../CommentItem';
import { useRouter } from 'next/router';
import { useComments, useCommentForm } from './hooks';

const VideoComments = () => {
  const router = useRouter();
  const { videoId } = router.query;

  const {
    comments,
    count,
    sort,
    hasMore,
    hasData,
    onNext,
    onSort,
  } = useComments(videoId);

  const {
    value,
    active,
    onChange,
    onFocus,
    onBlur,
    onCancel,
    onSubmit,
  } = useCommentForm(videoId);

  const loader = (
    <S.CircularProgressContainer>
      <S.CircularProgress thickness={4} />
    </S.CircularProgressContainer>
  );

  return (
    <S.VideoComments>
      <S.Title>{count && count > 0 ? `${count}개의 댓글` : '댓글'}</S.Title>
      <S.StyledTabs items={sortOptions} activeValue={sort} onClick={onSort} />
      <CommentForm
        value={value}
        active={active}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
      {hasData ? (
        <InfiniteScroll
          dataLength={comments.length}
          next={onNext}
          hasMore={hasMore}
          loader={loader}
        >
          <div>
            {comments.map(comment => (
              <CommentItem key={comment.id} {...comment} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        loader
      )}
    </S.VideoComments>
  );
};

export default VideoComments;
