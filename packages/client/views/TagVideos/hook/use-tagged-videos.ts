import { useState, useEffect } from 'react';
import { useQuery } from 'react-fetching-library';

import { TAG_VIDEOS_PER_PAGE, SORT } from '../../../constants';
import { makeQueryTaggedVideosAction } from '../action/make-query-tagged-videos-action';
import { useRouter } from 'next/router';
import { NATURAL_NUMBER_REGEX } from '../../../libs/regex';

export const useTaggedVideos = () => {
  const router = useRouter();
  const { tagId } = router.query;
  const validatedTagId = NATURAL_NUMBER_REGEX.test(tagId.toString())
    ? Number(tagId.toString())
    : null;

  const [sort, setSort] = useState(SORT.POPULAR);
  const [page, setPage] = useState(1);

  const [taggedVideos, setTaggedVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getTaggedVideosAction = makeQueryTaggedVideosAction(
    validatedTagId,
    page,
    sort,
  );
  const state = useQuery(getTaggedVideosAction, false);

  useEffect(() => {
    if (page === 1) {
      return;
    }

    const fetch = async () => {
      const { payload, error } = await state.query();
      if (!payload || error) {
        return;
      }

      setHasMore(payload.data.length >= TAG_VIDEOS_PER_PAGE);
      setTaggedVideos([...taggedVideos, ...payload.data]);
    };
    fetch();
  }, [page]);

  useEffect(() => {
    const fetch = async () => {
      const { payload, error } = await state.query();
      if (!payload || error) {
        return;
      }

      setHasMore(payload.data.length >= TAG_VIDEOS_PER_PAGE);
      setTaggedVideos(payload.data);
    };
    fetch();
  }, [sort]);

  const handleFilterClick = value => {
    setSort(value);
    setPage(1);
  };

  const handlePageChange = () => {
    if (taggedVideos.length > 0) {
      setPage(page + 1);
    }
  };

  return {
    taggedVideos,
    hasMore,
    handleFilterClick,
    handlePageChange,
    sort,
  };
};
