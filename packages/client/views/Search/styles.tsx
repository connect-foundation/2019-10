import styled from 'styled-components';
import { BREAKPOINT } from '../../constants';

import MaterialGrid from '@material-ui/core/Grid';

// layout
export const Layout = styled.div`
  display: flex;
  width: 100%;
  min-height: 100%;
`;

// content
export const Content = styled.main`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  background-color: #303537;
  margin-top: 12rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-top: 6.4rem;
    margin-left: 25rem;
  }
`;

/* window 의 넓이에 따라 변화하는 spacing을 정의해주기 위해 사용됨*/
export const ContainerGrid = styled(MaterialGrid)`
  && {
    @media only screen and (min-width: ${BREAKPOINT}px) {
      width: calc(100% + 24px);
      margin: -12px;
    }
  }

  && > .MuiGrid-item {
    @media only screen and (min-width: ${BREAKPOINT}px) {
      padding: 12px;
    }
  }
`;

export const Container = styled.div`
  height: 100%;
  margin: 0 2rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin: 0 3rem;
  }
`;

export const Title = styled.div`
  margin: 4rem 0;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin: 5rem 0 4rem 0;
  }

  span {
    margin-left: 1rem;
    color: white;
    font-size: 2.2rem;
    font-weight: bold;
    vertical-align: middle;
  }

  svg {
    vertical-align: middle;

    path:first-child {
      fill: white;
    }
  }
`;
