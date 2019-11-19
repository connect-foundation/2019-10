import React from 'react';
import Router from 'next/router';

import { routePath } from '../../constants';
import { ArrowBackSVG, SearchSVG } from '../../svgs';

import * as S from './styles';

interface Searchprops {
  deactivate: () => void;
  isActive: boolean;
}

export const Search: React.FunctionComponent<Searchprops> = ({
  deactivate,
  isActive,
}) => {
  const sendQuery = e => {
    if (e.key === 'Enter') {
      Router.push({
        pathname: routePath.search,
        query: { query: e.target.value },
      });
    }
  };

  return (
    <>
      <S.ArrowBack onClick={deactivate} isActive={isActive}>
        <ArrowBackSVG />
      </S.ArrowBack>

      <S.InputLayer isActive={isActive}>
        <SearchSVG />
        <S.Input placeholder="검색" onKeyPress={sendQuery}></S.Input>
      </S.InputLayer>
    </>
  );
};

export default Search;
