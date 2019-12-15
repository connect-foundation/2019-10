import { useState, useEffect } from 'react';
import { useQuery } from 'react-fetching-library';
import { Tag } from '../model/tag';
import { makeQueryTagAction } from '../action/make-query-tag-action';

export const useTag = (id: number) => {
  const [tag, setTag] = useState(new Tag(0, '', 0));

  const action = makeQueryTagAction(id);
  const { payload, error, ...rest } = useQuery(action);

  useEffect(() => {
    if (payload && !error) {
      setTag(payload);
    }
  }, [payload]);

  return { tag, error };
};
