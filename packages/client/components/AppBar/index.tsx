import React, { useState } from 'react';
import Link from 'next/link';

import { routePath } from '../../constants';
import { LogoSVG, CloudSVG, SearchSVG, ProfileSVG } from '../../svgs';

import * as S from './styles';

import SearchBar from '../SearchBar';

interface AppBarProps {
  maxWidth?: number;
}

export const AppBar: React.FunctionComponent<AppBarProps> = ({ maxWidth }) => {
  const [isSearchBarActive, SearchBarActive] = useState(false);

  const handleActiveSearchBar = () => {
    SearchBarActive(!isSearchBarActive);
  };

  return (
    <S.AppBar>
      <S.Container maxWidth={maxWidth}>
        <S.Logo isSearchBarActive={isSearchBarActive}>
          <LogoSVG />
        </S.Logo>

        <S.MobileButtons isSearchBarActive={isSearchBarActive}>
          <Link href={routePath.upload}>
            <a>
              <button>
                <CloudSVG />
              </button>
            </a>
          </Link>

          <button onClick={handleActiveSearchBar}>
            <SearchSVG width={23} height={24} />
          </button>

          <Link href={routePath.login}>
            <a>
              <button>
                <ProfileSVG />
              </button>
            </a>
          </Link>
        </S.MobileButtons>

        <SearchBar
          deactivate={handleActiveSearchBar}
          isActive={isSearchBarActive}
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
