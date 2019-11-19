import React from 'react';
import Link from 'next/link';

import * as S from './styles';
import { TOP, PERSISTENT, routePath } from '../../constants';
import { HotlistSVG, LatestSVG, TagsSVG } from '../../svgs';
import { useRouter } from 'next/router';

const Drawer: React.FunctionComponent = () => {
  const router = useRouter();

  return (
    <S.Drawer anchor={TOP} variant={PERSISTENT} open={true}>
      <S.Container>
        <S.MobileTabs>
          <Link href={routePath.hotlist}>
            <a>
              <button
                className={
                  router.pathname === routePath.hotlist ? 'active' : ''
                }
              >
                <HotlistSVG />
                <span>핫 리스트</span>
              </button>
            </a>
          </Link>

          <Link href={routePath.latest}>
            <a>
              <button
                className={router.pathname === routePath.latest ? 'active' : ''}
              >
                <LatestSVG />
                <span>최신 영상</span>
              </button>
            </a>
          </Link>

          <Link href={routePath.tags}>
            <a>
              <button
                className={router.pathname === routePath.tags ? 'active' : ''}
              >
                <TagsSVG />
                <span>인기 태그</span>
              </button>
            </a>
          </Link>
        </S.MobileTabs>

        <S.DesktopTabs>
          <Link href={routePath.hotlist}>
            <a>
              <button
                className={
                  router.pathname === routePath.hotlist ? 'active' : ''
                }
              >
                <HotlistSVG />
                <span>핫 리스트</span>
              </button>
            </a>
          </Link>

          <Link href={routePath.latest}>
            <a>
              <button
                className={router.pathname === routePath.latest ? 'active' : ''}
              >
                <LatestSVG />
                <span>최신 영상</span>
              </button>
            </a>
          </Link>

          <Link href={routePath.tags}>
            <a>
              <button
                className={router.pathname === routePath.tags ? 'active' : ''}
              >
                <TagsSVG />
                <span>인기 태그</span>
              </button>
            </a>
          </Link>
        </S.DesktopTabs>
      </S.Container>
    </S.Drawer>
  );
};

export default Drawer;
