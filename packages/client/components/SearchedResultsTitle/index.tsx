import React from 'react';
import * as S from './styles';
import { SearchSVG } from '../../svgs';

const SearchedResultsTitle = ({ searchKeyword }) => {
  return (
    <S.Title>
      <SearchSVG width={23} height={24} />
      <span>"{searchKeyword}" 검색 결과</span>
    </S.Title>
  );
};

export default SearchedResultsTitle;
