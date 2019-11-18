import React, { useState } from 'react';

import { ArrowBackSVG, SearchSVG } from '../../svgs';

import * as S from './styles';

interface Searchprops {
  inActive: () => void;
}

export const Search: React.FunctionComponent<Searchprops> = props => {
  return (
    <>
      <S.ArrowBack onClick={props.inActive}>
        <ArrowBackSVG />
      </S.ArrowBack>

      <S.InputLayer>
        <SearchSVG />
        <span>검색</span>
      </S.InputLayer>
    </>
  );
};

export default Search;
