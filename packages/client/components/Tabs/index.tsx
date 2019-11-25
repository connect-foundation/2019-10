import React from 'react';

import * as S from './styles';

interface TabsProps {
  items: Array<{ label: string; value: string }>;
  activeValue: string;
  onClick: (value: string) => void;
}

const Tabs: React.FunctionComponent<TabsProps> = ({
  items,
  activeValue,
  onClick,
  ...rest
}) => {
  return (
    <S.Tabs {...rest}>
      {items.map(({ label, value }) => {
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
    </S.Tabs>
  );
};

export default Tabs;
