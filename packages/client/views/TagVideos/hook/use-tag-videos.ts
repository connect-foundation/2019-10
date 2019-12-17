import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useTag } from './use-tag';
import { useVideos } from './use-videos';
import { NATURAL_NUMBER_REGEX } from '../../../libs/regex';
import { sortOptions, endpoint } from '../../../constants';

export const useTagVideos = () => {
  const router = useRouter();
  const { tagId } = router.query;
  const validatedTagId = NATURAL_NUMBER_REGEX.test(tagId.toString())
    ? Number(tagId.toString())
    : null;

  const [activeSortOption, setActiveSortOption] = useState(
    sortOptions[0].value,
  );
  const [page, setPage] = useState(1);

  const { tag, error } = useTag(validatedTagId);
  const { videos, hasMore } = useVideos(validatedTagId, page, activeSortOption);

  useEffect(() => {
    if (!tagId || error) {
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
    videos,
    handleFilterClick,
    handlePageChange,
    activeSortOption,
    hasMore,
  };
};
