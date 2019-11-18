import React, { useState } from 'react';

import { ArrowBackSVG, SearchSVG } from '../../svgs';

import * as S from './styles';

interface Searchprops {
  inActive: () => void;
  isActive: boolean;
}

export const Search: React.FunctionComponent<Searchprops> = props => {
  return (
    <>
      <S.ArrowBack onClick={props.inActive} isActive={props.isActive}>
        <ArrowBackSVG />
      </S.ArrowBack>

      <S.InputLayer isActive={props.isActive}>
        <SearchSVG />
        <span>검색</span>
      </S.InputLayer>
    </>
  );
};

export default Search;
