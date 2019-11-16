import React from 'react';
import Link from 'next/link';

import { routePath } from '../../constants';
import LogoSVG from '../../svgs/LogoSVG';
import CloudSVG from '../../svgs/CloudSVG';
import SearchSVG from '../../svgs/SearchSVG';
import ProfileSVG from '../../svgs/ProfileSVG';

import * as S from './styles';

export const AppBar = () => {
  return (
    <S.AppBar>
      <S.Container>
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
