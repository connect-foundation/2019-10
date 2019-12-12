import React from 'react';
import { CircularProgress } from '@material-ui/core';

import * as S from './styles';

const CircularLoader = ({ thickness = 4, justify = 'center' }) => {
  return (
    <S.Loader justify={justify}>
      <CircularProgress thickness={thickness} />
    </S.Loader>
  );
};

export default CircularLoader;
