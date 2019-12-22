import { useState, useEffect } from 'react';
import { useQuery } from 'react-fetching-library';

import { Tag } from '../model/tag';
import { makeQueryTagAction } from '../action/make-query-tag-action';
import { useRouter } from 'next/router';
import { NATURAL_NUMBER_REGEX } from '../../../libs/regex';

export const useTag = () => {
  const router = useRouter();
  const { tagId } = router.query;
  const validatedTagId = NATURAL_NUMBER_REGEX.test(tagId.toString())
    ? Number(tagId.toString())
    : null;
  const [tag, setTag] = useState(new Tag(0, '', 0));

  const getTagAction = makeQueryTagAction(validatedTagId);
  const state = useQuery(getTagAction, false);

  useEffect(() => {
    const fetch = async () => {
      const { payload, error } = await state.query();

      if (!payload || error) {
        // handle Error
        return;
      }

      setTag(payload);
    };

    fetch();
  }, []);

  return { tag };
};
