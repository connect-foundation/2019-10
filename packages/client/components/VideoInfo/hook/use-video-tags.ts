import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-fetching-library';

import { VideoTag } from '../model/video-tag';
import { makeQueryVideoTagsAction } from '../action/make-query-video-tags-action';
import { Tag } from '../../TagItem/interface/tag';

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

    setVideoTags(payload.data.map((tag: Tag) => new VideoTag(tag)));
  }, [payload]);

  return {
    videoTags,
  };
};
