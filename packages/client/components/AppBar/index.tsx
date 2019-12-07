import React, { useState } from 'react';
import Link from 'next/link';

import { endpoint } from '../../constants';
import { LogoSVG, CloudSVG, SearchSVG, ProfileSVG } from '../../svgs';

import * as S from './styles';

import SearchBar from '../SearchBar';
import { useUser } from '../UserProvider/hooks';

interface AppBarProps {
  maxWidth?: number;
}

export const AppBar: React.FunctionComponent<AppBarProps> = () => {
  const [isSearchBarActive, setSearchBarActive] = useState(false);

  const user = useUser();

  const handleSearchBar = () => {
    setSearchBarActive(!isSearchBarActive);
  };

  return (
    <S.AppBar>
      <S.Container>
        <S.Logo isSearchBarActive={isSearchBarActive}>
          <Link href="/">
            <a>
              <LogoSVG />
            </a>
          </Link>
        </S.Logo>

        <S.MobileButtons isSearchBarActive={isSearchBarActive}>
          <Link href={user ? endpoint.uploadVideoFile : endpoint.login}>
            <a>
              <button>
                <CloudSVG />
              </button>
            </a>
          </Link>

          <button onClick={handleSearchBar}>
            <SearchSVG width={24} height={24} />
          </button>

          <Link href={endpoint.login}>
            <a>
              <button>
                {user ? <img src={user.avatar} /> : <ProfileSVG />}
              </button>
            </a>
          </Link>
        </S.MobileButtons>

        <SearchBar deactivate={handleSearchBar} isActive={isSearchBarActive} />

        <S.DesktopButtons>
          <Link href={user ? endpoint.uploadVideoFile : endpoint.login}>
            <a>
              <button className="primary">
                <CloudSVG />
                <span>업로드</span>
              </button>
            </a>
          </Link>

          <Link href={endpoint.login}>
            {user ? (
              <a className="avatar">
                <button>
                  <img src={user.avatar} />
                </button>
              </a>
            ) : (
              <a>
                <button>
                  <ProfileSVG />
                  <span>로그인</span>
                </button>
              </a>
            )}
          </Link>
        </S.DesktopButtons>
      </S.Container>
    </S.AppBar>
  );
};

export default AppBar;
