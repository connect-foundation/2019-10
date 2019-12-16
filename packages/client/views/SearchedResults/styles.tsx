import styled from 'styled-components';
import { BREAKPOINT } from '../../constants';

import MaterialGrid from '@material-ui/core/Grid';
import Tabs from '../../components/Tabs';

import InfiniteScroll from 'react-infinite-scroll-component';

export const Container = styled.div`
  height: 100%;
  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin: 0 3rem;
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

export const StyledTabs = styled(Tabs)`
  margin-bottom: 2rem;
  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-bottom: 3rem;
  }
`;

export const StyledInfiniteScroll = styled(InfiniteScroll)`
  height: auto;
  overflow: visible !important;
  display: flex;
  flex-direction: column;
`;

export const Line = styled.div`
  position: relative;

  &&:after {
    position: absolute;
    content: '';
    display: block;
    border-bottom: 0.1rem solid #484c50;
    width: calc(100% + 4rem);
    left: -2rem;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      width: 100%;
      left: 0rem;
    }
  }
`;

export const NoResults = styled.div`
  span {
    color: white;
    font-size: 2rem;
    font-weight: 700;
    user-select: none;
    opacity: 0.8;
  }
`;
