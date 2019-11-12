import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import * as S from './styles';
import { LEFT, TOP, PERSISTENT, EVENT, BREAKPOINT } from '../../constants';

import HotlistSVG from '../../svgs/HotlistSVG';
import LatestSVG from '../../svgs/LatestSVG';
import TopicsSVG from '../../svgs/TopicsSVG';

interface DrawerProps {
  isDesktop: boolean;
}

function getAnchor(callback) {
  return callback() ? LEFT : TOP;
}

function isMobileScreen() {
  return () => window.innerWidth > BREAKPOINT;
}

export const Drawer: React.FunctionComponent<DrawerProps> = props => {
  const { isDesktop } = props;

  const [anchor, setAnchor] = useState(getAnchor(() => isDesktop));

  useEffect(() => {
    const relocate = () => {
      setAnchor(getAnchor(isMobileScreen()));
    };

    window.addEventListener(EVENT.resize, relocate);
    return () => window.removeEventListener(EVENT.resize, relocate);
  }, []);

  return (
    <S.Drawer anchor={anchor} variant={PERSISTENT} open={true}>
      <S.Container>
        <S.MobileTabs>
          <Link href="/trending">
            <a>
              <button className="active">
                <HotlistSVG />
                <span>핫 리스트</span>
              </button>
            </a>
          </Link>

          <Link href="/latest">
            <a>
              <button>
                <LatestSVG />
                <span>최신 영상</span>
              </button>
            </a>
          </Link>

          <Link href="/topics">
            <a>
              <button>
                <TopicsSVG />
                <span>인기 주제</span>
              </button>
            </a>
          </Link>
        </S.MobileTabs>

        <S.DesktopTabs>
          <Link href="/trending">
            <a>
              <button className="active">
                <HotlistSVG />
                <span>핫 리스트</span>
              </button>
            </a>
          </Link>

          <Link href="/latest">
            <a>
              <button>
                <LatestSVG />
                <span>최신 영상</span>
              </button>
            </a>
          </Link>

          <Link href="/topics">
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
