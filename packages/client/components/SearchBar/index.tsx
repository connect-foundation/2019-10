import React from 'react';
import { useRouter } from 'next/router';

import { endpoint } from '../../constants';
import { ArrowBackSVG, SearchSVG } from '../../svgs';

import * as S from './styles';

interface SearchBarProps {
  deactivate: () => void;
  isActive: boolean;
}

export const SearchBar: React.FunctionComponent<SearchBarProps> = ({
  deactivate,
  isActive,
}) => {
  const router = useRouter();
  const sendQuery = e => {
    const inputValue = e.target.value;
    const blankRegex = /^\s+|\s+$/;

    if (inputValue.replace(blankRegex, '') === '') {
      return;
    }

    if (e.key === 'Enter') {
      const value = inputValue.replace(/\s/, '');

      router.push({
        pathname: endpoint.search,
        query: { keyword: value },
      });
    }
  };

  return (
    <>
      <S.ArrowBack onClick={deactivate} isActive={isActive}>
        <ArrowBackSVG />
      </S.ArrowBack>

      <S.Input isActive={isActive}>
        <SearchSVG width={20} height={20} viewBox="0 0 24 24" />
        <input type="text" placeholder="검색" onKeyPress={sendQuery} />
      </S.Input>
    </>
  );
};

export default SearchBar;
