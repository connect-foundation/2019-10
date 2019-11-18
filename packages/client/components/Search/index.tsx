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
        <S.Input placeholder="검색"></S.Input>
      </S.InputLayer>
    </>
  );
};

export default Search;
