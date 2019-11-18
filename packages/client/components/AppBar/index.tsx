import React from 'react';
import Link from 'next/link';

import { routePath } from '../../constants';
import { LogoSVG, CloudSVG, SearchSVG, ProfileSVG } from '../../svgs';

import * as S from './styles';

interface AppBarProps {
  maxWidth?: number;
}

export const AppBar: React.FunctionComponent<AppBarProps> = ({ maxWidth }) => {
  return (
    <S.AppBar>
      <S.Container maxWidth={maxWidth}>
        <S.Logo>
          <LogoSVG />
        </S.Logo>

        <S.MobileButtons>
          <Link href={routePath.upload}>
            <a>
              <button>
                <CloudSVG />
              </button>
            </a>
          </Link>

          <button>
            <SearchSVG />
          </button>

          <Link href={routePath.login}>
            <a>
              <button>
                <ProfileSVG />
              </button>
            </a>
          </Link>
        </S.MobileButtons>

        <S.DesktopButtons>
          <Link href={routePath.upload}>
            <a>
              <button className="primary">
                <CloudSVG />
                <span>업로드</span>
              </button>
            </a>
          </Link>

          <Link href={routePath.login}>
            <a>
              <button>
                <ProfileSVG />
                <span>로그인</span>
              </button>
            </a>
          </Link>
        </S.DesktopButtons>
      </S.Container>
    </S.AppBar>
  );
};

export default AppBar;
