import React from 'react';
import Link from 'next/link';

import LogoSVG from '../../svgs/LogoSVG';
import CloudSVG from '../../svgs/CloudSVG';
import SearchSVG from '../../svgs/SearchSVG';
import ProfileSVG from '../../svgs/ProfileSVG';

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
          <Link href="/uploads">
            <a>
              <button>
                <CloudSVG />
              </button>
            </a>
          </Link>

          <button>
            <SearchSVG />
          </button>

          <Link href="/login">
            <a>
              <button>
                <ProfileSVG />
              </button>
            </a>
          </Link>
        </S.MobileButtons>

        <S.DesktopButtons>
          <Link href="/upload">
            <a>
              <button className="primary">
                <CloudSVG />
                <span>업로드</span>
              </button>
            </a>
          </Link>

          <Link href="/login">
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
