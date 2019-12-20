import styled from 'styled-components';

import MaterialAppBar from '@material-ui/core/AppBar';
import { BREAKPOINT, fontWeight } from '../../constants';

export const AppBar = styled(MaterialAppBar)`
  && {
    background-color: ${props => props.background};
    color: white;
    position: fixed;
    z-index: 2;
    box-shadow: none;
    display: block;
    flex-direction: unset;
    flex-shrink: unset;
  }
`;

export const Container = styled.div`
  position: relative;
  padding: 0 2rem;
  display: flex;
  height: 6.4rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    padding: 0 3rem 0 2rem;
  }
`;

export const Content = styled.div``;

export const Logo = styled.div`
  font-size: 2.8rem;
  display: ${props => (props.isSearchBarActive ? 'none' : 'block')};

  @media only screen and (min-width: ${BREAKPOINT}px) {
    flex: 1;
    margin-left: 1.3rem;
    display: block;
  }

  svg {
    height: 3rem;
    vertical-align: middle;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      height: 3.6rem;
    }
  }
`;

export const MobileButtons = styled.div`
  display: ${props => (props.isSearchBarActive ? 'none' : 'flex')};

  a {
    display: inherit;
  }

  button {
    outline: none;
    padding: 0;
    margin-left: 1.5rem;
    color: white;
    background: none;
    border: none;
    margin-left: 1.5rem;

    img {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 100%;
    }
  }

  @media only screen and (min-width: ${BREAKPOINT}px) {
    display: none;
  }
`;

export const DesktopButtons = styled.div`
  display: none;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    flex: 1;
    display: block;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  a {
    display: inline-block;
    margin-left: 1rem;

    button {
      outline: none;
      user-select: none;
      height: 3.2rem;
      padding: 0 1.6rem;
      border: 0;
      border-radius: 0.5rem;
      background: #484c50;
      color: white;
      font-size: 1.6rem;
      font-weight: bold;

      svg {
        vertical-align: middle;
        display: inline-block;
        margin-right: 1rem;
      }

      span {
        vertical-align: middle;
      }
    }

    button.primary {
      background-color: #02cf5d;
    }
  }
`;

export const DesktopAvatar = styled.div`
  margin-left: 2rem;
  position: relative;

  button {
    outline: none;
    background: unset;
    padding: unset;
    margin-left: 0;
    border: 0px;

    img {
      display: inline-block;
      width: 3.8rem;
      height: 3.8rem;
      border-radius: 100%;
      vertical-align: middle;
    }
  }
`;

export const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(34, 34, 34, 0.8);

  > div {
    background: #383d3f;

    > a {
      text-decoration: none;
      display: block;
      height: 5rem;
      color: white;
      font-size: 1.6rem;
      font-weight: ${fontWeight.bold};
      padding: 1.4rem 2rem;

      svg {
        vertical-align: middle;
        margin-right: 1rem;
      }

      span {
        vertical-align: middle;
      }
    }
  }

  @media only screen and (min-width: ${BREAKPOINT}px) {
    display: none;
  }
`;

export const DesktopMenuTail = styled.div`
  display: none;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    display: block;
    width: 1.4rem;
    height: 1.4rem;
    position: absolute;
    top: 100%;
    right: 1.2rem;
    background: #383d3f;
    transform: rotate(45deg);
    z-index: 1;
  }
`;

export const DesktopMenu = styled.div`
  display: none;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    display: block;
    position: absolute;
    top: calc(100% + 1rem);
    right: 0;
    width: 20rem;
    background: #383d3f;
    border-radius: 0.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  > a {
    @media only screen and (min-width: ${BREAKPOINT}px) {
      text-decoration: none;
      margin: 0;
      display: block;
      font-size: 1.6rem;
      color: white;
      font-weight: ${fontWeight.bold};
      padding: 1.4rem 1.6rem;
    }

    svg {
      vertical-align: middle;
      margin-right: 1rem;
    }

    span {
      vertical-align: middle;
    }
  }
`;
