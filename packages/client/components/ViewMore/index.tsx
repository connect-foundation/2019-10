import React from 'react';
import Link from 'next/link';
import * as S from './styles';

import { ArrowRightSVG } from '../../svgs';
import { endpoint, SEARCH_OPTION_LABELS } from '../../constants';

const ViewMore = ({ searchKeyword, optionValue }) => {
  return (
    <S.ViewMore>
      <Link
        prefetch={false}
        href={{
          pathname: `${endpoint.search}/${optionValue}`,
          query: { keyword: searchKeyword },
        }}
      >
        <a>
          <button>
            <span>전체 {SEARCH_OPTION_LABELS[optionValue]}</span>
            <ArrowRightSVG />
          </button>
        </a>
      </Link>
    </S.ViewMore>
  );
};

export default ViewMore;
