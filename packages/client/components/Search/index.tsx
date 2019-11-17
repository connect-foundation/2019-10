import React from 'react';
import Link from 'next/link';

import * as S from './styles';

export const Search = () => {
  return (
    <S.Search>
      <S.Container>
        <S.ArrawBack>
          <ArrawBackSVG />
        </S.ArrawBack>

        <S.InputLayer>
          <SearchSVG />
          <span>검색</span>
        </S.InputLayer>
      </S.Container>
    </S.Search>
  );
};

export default Search;
