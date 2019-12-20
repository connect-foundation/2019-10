import React from 'react';
import Link from 'next/link';

import * as S from './styles';
import { Tag } from './interface/tag';
import { endpoint } from '../../constants';

const TagItem = (tag: Tag) => {
  return (
    <Link prefetch={false} href={`${endpoint.tags}/${tag.id}`}>
      <S.Tag>
        <S.TagTitle>{tag.name}</S.TagTitle>
        <S.TagCount>{tag.videosCount.toLocaleString()}</S.TagCount>
      </S.Tag>
    </Link>
  );
};

export default TagItem;
