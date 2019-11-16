import React from 'react';
import Grid from '@material-ui/core/Grid';

import * as S from './styles';
import Layout from '../../components/Layout';

const TagList: React.FunctionComponent = () => {
  return (
    <Layout>
      <S.TagList>
        <S.ContainerGrid container spacing={0} justify="center">
          <Grid item xs={12} md={12}>
            <S.ContainerGrid container spacing={2} justify={'center'}>
              <Grid item xs={6} md={2}>
                <S.Tag>
                  <S.TagTitle>python</S.TagTitle>
                  <S.TagCount>2,292</S.TagCount>
                </S.Tag>
              </Grid>
              <Grid item xs={6} md={2}>
                <S.Tag>
                  <S.TagTitle>python</S.TagTitle>
                  <S.TagCount>2,292</S.TagCount>
                </S.Tag>
              </Grid>
              <Grid item xs={6} md={2}>
                <S.Tag>
                  <S.TagTitle>python</S.TagTitle>
                  <S.TagCount>2,292</S.TagCount>
                </S.Tag>
              </Grid>
              <Grid item xs={6} md={2}>
                <S.Tag>
                  <S.TagTitle>python</S.TagTitle>
                  <S.TagCount>2,292</S.TagCount>
                </S.Tag>
              </Grid>
            </S.ContainerGrid>

            <S.ContainerGrid container spacing={2} justify={'center'}>
              <Grid item xs={6} md={2}>
                <S.Tag>
                  <S.TagTitle>python</S.TagTitle>
                  <S.TagCount>2,292</S.TagCount>
                </S.Tag>
              </Grid>
              <Grid item xs={6} md={2}>
                <S.Tag>
                  <S.TagTitle>python</S.TagTitle>
                  <S.TagCount>2,292</S.TagCount>
                </S.Tag>
              </Grid>
              <Grid item xs={6} md={2}>
                <S.Tag>
                  <S.TagTitle>python</S.TagTitle>
                  <S.TagCount>2,292</S.TagCount>
                </S.Tag>
              </Grid>
              <Grid item xs={6} md={2}>
                <S.Tag>
                  <S.TagTitle>python</S.TagTitle>
                  <S.TagCount>2,292</S.TagCount>
                </S.Tag>
              </Grid>
            </S.ContainerGrid>

            <S.ContainerGrid container spacing={2} justify={'center'}>
              <Grid item xs={6} md={2}>
                <S.Tag>
                  <S.TagTitle>python</S.TagTitle>
                  <S.TagCount>2,292</S.TagCount>
                </S.Tag>
              </Grid>
              <Grid item xs={6} md={2}>
                <S.Tag>
                  <S.TagTitle>python</S.TagTitle>
                  <S.TagCount>2,292</S.TagCount>
                </S.Tag>
              </Grid>
              <Grid item xs={6} md={2}>
                <S.Tag>
                  <S.TagTitle>python</S.TagTitle>
                  <S.TagCount>2,292</S.TagCount>
                </S.Tag>
              </Grid>
              <Grid item xs={6} md={2}>
                <S.Tag>
                  <S.TagTitle>python</S.TagTitle>
                  <S.TagCount>2,292</S.TagCount>
                </S.Tag>
              </Grid>
            </S.ContainerGrid>
          </Grid>
        </S.ContainerGrid>
      </S.TagList>
    </Layout>
  );
};

export default TagList;
