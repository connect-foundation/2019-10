import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

import { endpoint } from '../../constants';
import {
  LogoSVG,
  CloudSVG,
  SearchSVG,
  ProfileSVG,
  SettingsSVG,
  PowerSVG,
} from '../../svgs';

import * as S from './styles';

import SearchBar from '../SearchBar';
import { useUser } from '../UserProvider/hooks';

interface AppBarProps {
  maxWidth?: number;
}

export const AppBar: React.FunctionComponent<AppBarProps> = () => {
  const [isSearchBarActive, setSearchBarActive] = useState(false);
  const [isMenuActive, setMenuActive] = useState(false);

  const user = useUser();

  useEffect(() => {
    window.addEventListener('click', handleAvatarClose);
    return () => {
      window.removeEventListener('click', handleAvatarClose);
    };
  }, []);

  const handleSearchBar = () => {
    setSearchBarActive(!isSearchBarActive);
  };

  const handleAvatarClick = e => {
    e.stopPropagation();
    setMenuActive(!isMenuActive);
  };

  const handleAvatarClose = () => {
    setMenuActive(false);
  };

  const menuItems = user && (
    <>
      <Link href={`/users/${user.id}`}>
        <a>
          <ProfileSVG />
          <span>내 프로필</span>
        </a>
      </Link>
      <Link href={endpoint.profileEdit}>
        <a>
          <SettingsSVG />
          <span>프로필 변경</span>
        </a>
      </Link>
      <a>
        <PowerSVG />
        <span>로그아웃</span>
      </a>
    </>
  );

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

          {user ? (
            <button onClick={handleAvatarClick}>
              <img src={user.avatar} />
            </button>
          ) : (
            <Link href={endpoint.login}>
              <a>
                <button>
                  <ProfileSVG />
                </button>
              </a>
            </Link>
          )}
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
          {user ? (
            <S.DesktopAvatar>
              <button onClick={handleAvatarClick}>
                <img src={user.avatar} />
              </button>
              {isMenuActive && (
                <S.DesktopMenu onClick={e => e.stopPropagation()}>
                  {menuItems}
                </S.DesktopMenu>
              )}
            </S.DesktopAvatar>
          ) : (
            <Link href={endpoint.login}>
              <a>
                <button>
                  <ProfileSVG />
                  <span>로그인</span>
                </button>
              </a>
            </Link>
          )}
        </S.DesktopButtons>
        {isMenuActive && (
          <S.MobileMenu>
            <div onClick={e => e.stopPropagation()}>{menuItems}</div>
          </S.MobileMenu>
        )}
      </S.Container>
    </S.AppBar>
  );
};

export default AppBar;
