import { useState, useEffect } from 'react';
import { useQuery } from 'react-fetching-library';

import { Tag } from '../model/tag';
import { makeQueryTagAction } from '../action/make-query-tag-action';

export const useTag = (id: number) => {
  const [tag, setTag] = useState(new Tag(0, '', 0));

  const getTagAction = makeQueryTagAction(id);
  const { payload, error } = useQuery(getTagAction);

  useEffect(() => {
    if (!payload) {
      // handle Error
      return;
    }

    if (!error) {
      setTag(payload);
    }
  }, [payload]);

  return { tag, error };
};
