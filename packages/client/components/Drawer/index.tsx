import React from 'react';
import Link from 'next/link';

import * as S from './styles';
import { TOP, PERSISTENT, endpoint } from '../../constants';
import { HotlistSVG, LatestSVG, TagsSVG } from '../../svgs';
import { useRouter } from 'next/router';

const Drawer: React.FunctionComponent = () => {
  const router = useRouter();

  return (
    <S.Drawer anchor={TOP} variant={PERSISTENT} open={true}>
      <S.Container>
        <S.MobileTabs>
          <Link href={endpoint.hotlist}>
            <a>
              <button
                className={router.pathname === endpoint.hotlist ? 'active' : ''}
              >
                <HotlistSVG />
                <span>핫 리스트</span>
              </button>
            </a>
          </Link>

          <Link href={endpoint.latest}>
            <a>
              <button
                className={router.pathname === endpoint.latest ? 'active' : ''}
              >
                <LatestSVG />
                <span>최신 영상</span>
              </button>
            </a>
          </Link>

          <Link href={endpoint.tags}>
            <a>
              <button
                className={router.pathname === endpoint.tags ? 'active' : ''}
              >
                <TagsSVG />
                <span>인기 태그</span>
              </button>
            </a>
          </Link>
        </S.MobileTabs>

        <S.DesktopTabs>
          <Link href={endpoint.hotlist}>
            <a>
              <button
                className={router.pathname === endpoint.hotlist ? 'active' : ''}
              >
                <HotlistSVG />
                <span>핫 리스트</span>
              </button>
            </a>
          </Link>

          <Link href={endpoint.latest}>
            <a>
              <button
                className={router.pathname === endpoint.latest ? 'active' : ''}
              >
                <LatestSVG />
                <span>최신 영상</span>
              </button>
            </a>
          </Link>

          <Link href={endpoint.tags}>
            <a>
              <button
                className={router.pathname === endpoint.tags ? 'active' : ''}
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
