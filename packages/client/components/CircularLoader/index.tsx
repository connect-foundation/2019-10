import React from 'react';
import { CircularProgress } from '@material-ui/core';

import * as S from './styles';

const CircularLoader = ({
  size = 3,
  thickness = 4,
  justify = 'center',
  color = 'rgba(255, 255, 255, 0.1)',
}) => {
  return (
    <S.Loader justify={justify} size={size} color={color}>
      <CircularProgress thickness={thickness} />
    </S.Loader>
  );
};

export default CircularLoader;
