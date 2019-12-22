import styled from 'styled-components';
import MaterialGrid from '@material-ui/core/Grid';

import { BREAKPOINT, fontWeight } from '../../constants';
import InfiniteScroll from 'react-infinite-scroll-component';

/* window 의 넓이에 따라 변화하는 spacing을 정의해주기 위해 사용됨*/
export const ContainerGrid = styled(MaterialGrid)`
  && {
    margin-bottom: 0.8rem;
    @media only screen and (min-width: ${BREAKPOINT}px) {
      width: calc(100% + 24px);
      margin: -12px;
      margin-bottom: 1.2rem;
    }
  }

  && > .MuiGrid-item {
    @media only screen and (min-width: ${BREAKPOINT}px) {
      padding: 12px;
    }
  }
`;

export const Title = styled.div`
  margin: 3rem 0;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin: 5rem 0 3rem 0;
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

export const Tags = styled.div`
  margin: 2rem 0rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin: 5rem 3rem 0 3rem;
  }
`;

export const Tag = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #484c50;
  border-radius: 0.5rem;
`;

export const StyledInfiniteScroll = styled(InfiniteScroll)`
  height: auto;
  overflow: visible !important;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
