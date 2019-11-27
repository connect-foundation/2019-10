import React from 'react';

import * as S from './styles';

import { MAX_WIDTH } from '../../constants';

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
  const maxWidth = drawer ? null : MAX_WIDTH;

  return (
    <S.Layout>
      <AppBar />
      {drawer && <Drawer />}
      <Content maxWidth={maxWidth}>{children}</Content>
    </S.Layout>
  );
};

export default Layout;
