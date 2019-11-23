import styled from 'styled-components';

import MaterialAppBar from '@material-ui/core/AppBar';
import { BREAKPOINT } from '../../constants';

export const AppBar = styled(MaterialAppBar)`
  && {
    background-color: #383d3f;
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
  padding: 0 2rem;
  display: flex;
  height: 6.4rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media only screen and (min-width: ${BREAKPOINT}px) {
    ${props =>
      props.maxWidth &&
      `
      max-width: ${props.maxWidth}px;
      margin: 0 auto;
      padding: 0;
    `}
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
  display: ${props => (props.isSearchBarActive ? 'none' : 'block')};

  button {
    padding: 0;
    margin-left: 1.5rem;
    color: white;
    background: none;
    border: none;
    margin-left: 1.5rem;
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
  }

  a {
    button {
      user-select: none;
      cursor: pointer;
      height: 3.2rem;
      padding: 0 1.6rem;
      border: 0;
      border-radius: 0.5rem;
      background: #484c50;
      color: white;
      font-size: 1.6rem;
      font-weight: bold;
      margin-left: 1rem;

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
