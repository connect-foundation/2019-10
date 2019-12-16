import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import * as S from './style';
import { sortOptions } from '../../constants';
import CommentForm from '../CommentForm';
import CommentItem from '../CommentItem';
import { useRouter } from 'next/router';
import CircularLoader from '../CircularLoader';
import { useComments } from './hook/use-comments';

const VideoComments = () => {
  const router = useRouter();
  const { videoId } = router.query;

  const {
    count,
    sort,
    onSort,
    formLoading,
    formValue,
    formActive,
    onFormChange,
    onFormFocus,
    onFormBlur,
    onFormCancel,
    onFormSubmit,
    comments,
    onNext,
    hasMore,
    submittedComments,
  } = useComments(videoId);

  return (
    <S.VideoComments>
      <S.Title>{count > 0 ? `${count}개의 댓글` : '댓글'}</S.Title>
      <S.StyledTabs items={sortOptions} activeValue={sort} onClick={onSort} />
      <CommentForm
        loading={formLoading}
        value={formValue}
        active={formActive}
        onChange={onFormChange}
        onFocus={onFormFocus}
        onBlur={onFormBlur}
        onCancel={onFormCancel}
        onSubmit={onFormSubmit}
      />
      {submittedComments.map(comment => (
        <CommentItem key={comment.id} {...comment} />
      ))}
      <InfiniteScroll
        style={{ overflow: 'hidden' }}
        dataLength={comments.length}
        hasMore={hasMore}
        loader={<CircularLoader thickness={4} />}
        next={onNext}
        scrollThreshold={0.9}
      >
        <div>
          {comments.map(comment => (
            <CommentItem key={comment.id} {...comment} />
          ))}
        </div>
      </InfiniteScroll>
    </S.VideoComments>
  );
};

export default VideoComments;
