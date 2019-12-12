import React from 'react';

import * as S from './styles';
import { CancelSVG } from '../../svgs';

export const TagLabel = ({ name, deleteTag }) => {
  return (
    <S.TagLabel key={name}>
      <S.TagName>{name}</S.TagName>
      <CancelSVG
        onClick={() => {
          deleteTag(name);
        }}
      />
    </S.TagLabel>
  );
};
