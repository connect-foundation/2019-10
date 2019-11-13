import React from 'react';

import * as S from './styles';

import AppBar from '../AppBar';
import Drawer from '../Drawer';
import Content from '../Content';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <S.Layout>
      <AppBar />
      <Drawer />
      <Content>{children}</Content>
    </S.Layout>
  );
};

export default Layout;
