import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { endpoint, ENTER } from '../../constants';
import { ArrowBackSVG, SearchSVG } from '../../svgs';

import * as S from './style';

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
    if (e.target.value.trim()) {
      setInputValue(e.target.value);
    }
  };

  const handleKeyPress = e => {
    if (e.key === ENTER) {
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
        <SearchSVG />
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
