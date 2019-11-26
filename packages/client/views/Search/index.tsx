import React from 'react';
import { useRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';

import * as S from './styles';
import { SearchSVG } from '../../svgs';

import Layout from '../../components/Layout';
import VideoItem from '../../components/VideoItem';

const Searched: React.FunctionComponent = () => {
  const router = useRouter();
  return (
    <Layout>
      <S.Container>
        <S.Title>
          <SearchSVG width={23} height={24} />
          <span>"{router.query.query}" 검색 결과</span>
        </S.Title>
        <S.Subject> 영상 </S.Subject>
        <S.ContainerGrid container spacing={2}>
        </S.ContainerGrid>
      </S.Container>
    </Layout>
  );
};

export default Searched;
