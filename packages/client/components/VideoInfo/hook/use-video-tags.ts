import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-fetching-library';

import { makeQueryVideoTagsAction } from '../action/make-query-video-tags-action';
import { ExtractedTag } from '../interface/tag';

export const useVideoTags = () => {
  const router = useRouter();
  const { videoId } = router.query;

  const [videoTags, setVideoTags] = useState([]);

  const getVideoTags = makeQueryVideoTagsAction(videoId);
  const state = useQuery(getVideoTags, false);

  useEffect(() => {
    const fetch = async () => {
      const { payload, error } = await state.query();
      if (!payload || error) {
        // handle Error
        return;
      }

      const tags: ExtractedTag[] = payload;
      setVideoTags(tags);
    };
    fetch();
  }, []);

  return {
    videoTags,
  };
};
