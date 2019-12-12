import React from 'react';
import Link from 'next/link';
import * as S from './styles';

import { ArrowRightSVG } from '../../svgs';
import { endpoint, searchOptions } from '../../constants';

const ViewMore = ({ searchKeyword, num, options }) => {
  return (
    <S.ViewMore>
      <Link
        prefetch={false}
        href={{
          pathname: `${endpoint.search}/${searchOptions[num].value}`,
          query: { keyword: searchKeyword, options },
        }}
      >
        <a>
          <button>
            <span>전체 {searchOptions[num].label}</span>
            <ArrowRightSVG />
          </button>
        </a>
      </Link>
    </S.ViewMore>
  );
};

export default ViewMore;
