import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-fetching-library';

import { makeQueryVideoTagsAction } from '../action/make-query-video-tags-action';
import { Tag } from '../interface/tag';

export const useVideoTags = () => {
  const router = useRouter();
  const { videoId } = router.query;

  const [videoTags, setVideoTags] = useState([]);

  const getVideoTags = makeQueryVideoTagsAction(videoId);
  const { payload, error } = useQuery(getVideoTags);

  useEffect(() => {
    if (error) {
      // handle Error
      return;
    }

    if (!payload) {
      // handle Error
      return;
    }

    const tags: Tag[] = payload;
    setVideoTags(tags);
  }, [payload]);

  return {
    videoTags,
  };
};
