import React from 'react';
import * as S from './styles';
import { Tag } from './interface/tag';

const TagItem = (tag: Tag) => {
  return (
    <S.Tag>
      <S.TagTitle>{tag.name}</S.TagTitle>
      <S.TagCount>{tag.videosCount.toLocaleString()}</S.TagCount>
    </S.Tag>
  );
};

export default TagItem;
