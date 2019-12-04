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
    if (e.key === 'Enter') {
      router.push({
        pathname: endpoint.search,
        query: { keyword: e.target.value },
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
