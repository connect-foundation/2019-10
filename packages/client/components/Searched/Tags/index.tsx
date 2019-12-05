import React from 'react';
import * as S from '../styles';

const SearchedTags = ({ tags }) => {
  return (
    <>
      <S.Subject> 태그 </S.Subject>
      <S.Tags>
        {tags.map(tag => {
          return (
            <div key={tag.id}>
              <S.Tag>{tag.name}</S.Tag>;
            </div>
          );
        })}
      </S.Tags>
    </>
  );
};

export default SearchedTags;
