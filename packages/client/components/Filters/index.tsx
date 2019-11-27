import React from 'react';

import * as S from './styles';

interface FiltersProps {
  filters: Array<{ label: string; value: string }>;
  activeValue: string;
  onClick: (value: string) => void;
}

const Filters: React.FunctionComponent<FiltersProps> = ({
  filters,
  activeValue,
  onClick,
  ...rest
}) => {
  return (
    <S.Filters {...rest}>
      {filters.map(({ label, value }) => {
        const className = activeValue === value ? 'active' : '';
        return (
          <li
            key={value}
            className={className}
            onClick={() => {
              onClick(value);
            }}
          >
            {label}
          </li>
        );
      })}
    </S.Filters>
  );
};

export default Filters;
