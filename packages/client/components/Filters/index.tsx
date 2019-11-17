import React from 'react';

import * as S from './styles';

interface FiltersProps {
  filters: string[];
  activeFilter: string;
  onClick: (filter: string) => void;
}

const Filters: React.FunctionComponent<FiltersProps> = ({
  filters,
  activeFilter,
  onClick,
  ...rest
}) => {
  return (
    <S.Filters {...rest}>
      {filters.map(filter => {
        const className = activeFilter === filter ? 'active' : '';
        return (
          <li
            key={filter}
            className={className}
            onClick={() => {
              onClick(filter);
            }}
          >
            {filter}
          </li>
        );
      })}
    </S.Filters>
  );
};

export default Filters;
