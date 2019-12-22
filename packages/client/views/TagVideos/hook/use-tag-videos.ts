import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useTag } from './use-tag';
import { useTaggedVideos } from './use-tagged-videos';
import { SORT, endpoint } from '../../../constants';
import { NATURAL_NUMBER_REGEX } from '../../../libs/regex';

export const useTagVideos = () => {
  const router = useRouter();
  const { tagId } = router.query;
  const validatedTagId = NATURAL_NUMBER_REGEX.test(tagId.toString())
    ? Number(tagId.toString())
    : null;

  const [activeSortOption, setActiveSortOption] = useState(SORT.POPULAR);
  const [page, setPage] = useState(1);

  const { tag, error } = useTag(validatedTagId);
  const { allTaggedVideos, hasMore } = useTaggedVideos(
    validatedTagId,
    page,
    activeSortOption,
  );

  useEffect(() => {
    if (!validatedTagId || error) {
      router.push(endpoint.hotlist);
    }
  }, [error]);

  const handleFilterClick = value => {
    setActiveSortOption(value);
    setPage(1);
  };

  const handlePageChange = () => {
    setPage(page + 1);
  };

  return {
    tag,
    allTaggedVideos,
    handleFilterClick,
    handlePageChange,
    activeSortOption,
    hasMore,
  };
};
