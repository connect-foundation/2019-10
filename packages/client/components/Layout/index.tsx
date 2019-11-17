import React from 'react';

import * as S from './styles';

import AppBar from '../AppBar';
import Drawer from '../Drawer';
import Content from '../Content';

interface LayoutProps {
  children?: React.ReactNode;
  drawer?: boolean;
}

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  drawer = true,
}) => {
  const maxWidth = drawer ? null : 1200;

  return (
    <S.Layout>
      <AppBar maxWidth={maxWidth} />
      {drawer && <Drawer />}
      <Content maxWidth={maxWidth}>{children}</Content>
    </S.Layout>
  );
};

export default Layout;
