import React from 'react';
import * as S from './styles';

interface ContentProps {
  children?: React.ReactNode;
}

const Content: React.FunctionComponent<ContentProps> = ({ children }) => {
  return <S.Content>{children}</S.Content>;
};

export default Content;
