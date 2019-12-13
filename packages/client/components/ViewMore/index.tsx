import React from 'react';
import Link from 'next/link';
import * as S from './styles';

import { ArrowRightSVG } from '../../svgs';
import { endpoint, searchOptions } from '../../constants';

const ViewMore = ({ searchKeyword, index, options }) => {
  return (
    <S.ViewMore>
      <Link
        prefetch={false}
        href={{
          pathname: `${endpoint.search}/${searchOptions[index].value}`,
          query: { keyword: searchKeyword, options },
        }}
      >
        <a>
          <button>
            <span>전체 {searchOptions[index].label}</span>
            <ArrowRightSVG />
          </button>
        </a>
      </Link>
    </S.ViewMore>
  );
};

export default ViewMore;
