import React from 'react';
import * as S from './styles';

interface ContentProps {
  children?: React.ReactNode;
  maxWidth?: number;
}

const Content: React.FunctionComponent<ContentProps> = ({
  children,
  maxWidth,
}) => {
  return (
    <S.Content>
      <S.Container maxWidth={maxWidth}>{children}</S.Container>
    </S.Content>
  );
};

export default Content;
