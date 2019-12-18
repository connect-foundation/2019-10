import { useState, useEffect } from 'react';
import { useQuery } from 'react-fetching-library';

import { TAG_VIDEOS_PER_PAGE } from '../../../constants';
import { makeQueryTaggedVideosAction } from '../action/make-query-tagged-videos-action';

export const useTaggedVideos = (id: number, page: number, sort: string) => {
  const [allTaggedVideos, setTaggedVideos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getTaggedVideosAction = makeQueryTaggedVideosAction(id, page, sort);
  const { payload: taggedVideos, error } = useQuery(getTaggedVideosAction);

  useEffect(() => {
    setTaggedVideos([]);
  }, [sort]);

  useEffect(() => {
    if (!taggedVideos) {
      // handle Error
      return;
    }
    if (!error) {
      setHasMore(taggedVideos.data.length >= TAG_VIDEOS_PER_PAGE);
      setTaggedVideos([...allTaggedVideos, ...taggedVideos.data]);
    }
  }, [taggedVideos]);

  return { allTaggedVideos, hasMore };
};
