import React from 'react';
import * as S from './style';
import { SearchSVG } from '../../svgs';

const SearchedResultsTitle = ({ searchKeyword }) => {
  return (
    <S.Title>
      <SearchSVG />
      <span>"{searchKeyword}" 검색 결과</span>
    </S.Title>
  );
};

export default SearchedResultsTitle;
