import React, { useState } from 'react';
import Link from 'next/link';

import { routePath } from '../../constants';
import { LogoSVG, CloudSVG, SearchSVG, ProfileSVG } from '../../svgs';

import * as S from './styles';

import Search from '../Search';

interface AppBarProps {
  maxWidth?: number;
}

export const AppBar: React.FunctionComponent<AppBarProps> = ({ maxWidth }) => {
  const [isActiveSearchBar, setActiveSearchBar] = useState(false);

  const handleActiveSearchBar = () => {
    setActiveSearchBar(!isActiveSearchBar);
  };

  return (
    <S.AppBar>
      <S.Container maxWidth={maxWidth}>
        <S.Logo isActiveSearchBar={isActiveSearchBar}>
          <LogoSVG />
        </S.Logo>

        <S.MobileButtons isActiveSearchBar={isActiveSearchBar}>
          <Link href={routePath.upload}>
            <a>
              <button>
                <CloudSVG />
              </button>
            </a>
          </Link>

          <button onClick={handleActiveSearchBar}>
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

        <Search
          deactivate={handleActiveSearchBar}
          isActive={isActiveSearchBar}
        />

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
