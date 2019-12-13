import React, { useState } from 'react';
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
  const [inputValue, setInputValue] = useState('');

  const handleChange = e => {
    if (e.target.value !== ' ') {
      setInputValue(e.target.value);
    }
    setInputValue(e.target.value.replace(/\s/, ''));
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      router.push({
        pathname: endpoint.search,
        query: { keyword: inputValue },
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
        <input
          value={inputValue}
          onChange={handleChange}
          type="text"
          placeholder="검색"
          onKeyPress={handleKeyPress}
        />
      </S.Input>
    </>
  );
};

export default SearchBar;
