import React from 'react';
import Link from 'next/link';

import * as S from './styles';
import { TOP, PERSISTENT, routePath } from '../../constants';
import { HotlistSVG, LatestSVG, TopicsSVG } from '../../svgs';

const Drawer: React.FunctionComponent = () => {
  return (
    <S.Drawer anchor={TOP} variant={PERSISTENT} open={true}>
      <S.Container>
        <S.MobileTabs>
          <Link href={routePath.hotlists}>
            <a>
              <button className="active">
                <HotlistSVG />
                <span>핫 리스트</span>
              </button>
            </a>
          </Link>

          <Link href={routePath.latests}>
            <a>
              <button>
                <LatestSVG />
                <span>최신 영상</span>
              </button>
            </a>
          </Link>

          <Link href={routePath.tags}>
            <a>
              <button>
                <TopicsSVG />
                <span>인기 주제</span>
              </button>
            </a>
          </Link>
        </S.MobileTabs>

        <S.DesktopTabs>
          <Link href={routePath.hotlists}>
            <a>
              <button className="active">
                <HotlistSVG />
                <span>핫 리스트</span>
              </button>
            </a>
          </Link>

          <Link href={routePath.latests}>
            <a>
              <button>
                <LatestSVG />
                <span>최신 영상</span>
              </button>
            </a>
          </Link>

          <Link href={routePath.tags}>
            <a>
              <button>
                <TopicsSVG />
                <span>인기 주제</span>
              </button>
            </a>
          </Link>
        </S.DesktopTabs>
      </S.Container>
    </S.Drawer>
  );
};

export default Drawer;
