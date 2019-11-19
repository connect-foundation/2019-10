import styled from 'styled-components';

import MaterialDrawer from '@material-ui/core/Drawer';
import { BREAKPOINT, fontWeight } from '../../constants';

export const Drawer = styled(MaterialDrawer)`
  && {
    z-index: 1;
    flex-shrink: 0;
  }

  && > div {
    border: 0;
    @media only screen and (min-width: ${BREAKPOINT}px) {
      left: 0;
      right: auto;

      height: 100%;
    }
  }
`;

export const Container = styled.div`
  padding-top: 6.4rem;
  background-color: #383d3f;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    width: 22rem;
    height: 100%;
  }
`;

export const MobileTabs = styled.div`
  display: flex;
  width: 100%;
  height: 5.6rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    display: none;
  }

  a {
    display: block;
    width: 100%;
    text-decoration: none;
    button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: #383d3f;
      border: 0;
      border-bottom: 0.2rem solid #383d3f;

      svg {
        margin-bottom: 0.5rem;
        opacity: 0.7;
      }
      span {
        color: white;
        font-size: 1.2rem;
        font-weight: ${fontWeight.bold};
        opacity: 0.7;
      }
    }
    button.active {
      border-bottom: 0.2rem solid #02cf5d;

      svg {
        opacity: 1;
        path:first-child {
          fill: #02ce5c;
        }
      }
      span {
        /* color: #02ce5c; */
        opacity: 1;
      }
    }
  }
`;

export const DesktopTabs = styled.div`
  display: none;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    width: 100%;
    display: flex;
    flex-direction: column;

    a {
      display: block;
      text-decoration: none;

      button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        height: 5.4rem;
        background-color: #383d3f;
        border: none;
        padding: 0;
        outline: unset;
        cursor: pointer;

        svg {
          vertical-align: middle;
          margin-left: 3rem;
          opacity: 0.7;
        }

        span {
          color: white;
          opacity: 0.7;
          vertical-align: middle;
          margin-left: 1.5rem;
          font-size: 1.7rem;
          font-weight: ${fontWeight.bold};
        }
      }

      button.active {
        background-color: #484c50;
        border-right: 0.5rem solid #02cf5d;

        svg {
          opacity: 1;
          path:first-child {
            fill: #02ce5c;
          }
        }
        span {
          /* color: #02ce5c; */
          opacity: 1;
        }
      }
    }
  }
`;
