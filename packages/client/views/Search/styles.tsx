import styled from 'styled-components';
import { BREAKPOINT } from '../../constants';

import MaterialGrid from '@material-ui/core/Grid';

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

export const Title = styled.div`
  margin-top: 4rem;

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

// subject
export const Subject = styled.div`
  margin-top: 4.4rem;
  color: white;
  font-size: 2.2rem;
`;

export const Users = styled.div``;
export const User = styled.div`
  display: flex;
  margin-bottom: 2rem;
`;
export const Avatar = styled.div`
  margin-right: 1.6rem;
  img {
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
    background-color: red;
    vertical-align: middle;
  }
`;

export const Username = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  color: white;
  font-size: 1.8rem;
`;

export const Topics = styled.div``;
export const Topic = styled.span`
  display: inline-block;
  user-select: none;
  padding: 0rem 1.4rem;
  height: 2.2rem;
  line-height: 2.2rem;
  font-size: 1.4rem;
  font-weight: 400;
  color: white;
  background: #484c50;
  border-radius: 10rem;
  margin-bottom: 2rem;
  cursor: pointer;
`;
