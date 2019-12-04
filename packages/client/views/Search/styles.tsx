import styled from 'styled-components';
import { BREAKPOINT } from '../../constants';

import MaterialGrid from '@material-ui/core/Grid';
import Tabs from '../../components/Tabs';

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

export const Title = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;
  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin: 5rem 0 3rem 0;
  }
  span {
    margin-left: 1rem;
    color: white;
    font-size: 2rem;
    font-weight: 700;
    vertical-align: middle;
  }
  svg {
    vertical-align: middle;
    path:first-child {
      fill: white;
    }
  }
`;

export const Line = styled.hr`
  border: 1px solid #484c50;
`;

// subject
export const Subject = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  color: white;
  font-size: 2.2rem;
  font-weight: 700;
  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
`;
export const Videos = styled.div`
  margin-bottom: 2rem;
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
    cursor: pointer;
  }
`;

export const Username = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  color: white;
  font-size: 1.6rem;
  font-weight: 700;
`;

export const Tags = styled.div``;
export const Tag = styled.span`
  display: inline-block;
  user-select: none;
  padding: 0rem 2rem;
  height: 3.4rem;
  line-height: 3.4rem;
  font-size: 1.6rem;
  font-weight: 700;
  color: white;
  background: #484c50;
  border-radius: 10rem;
  margin-bottom: 2rem;
  cursor: pointer;
`;

export const ViewMore = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.3rem;
  button {
    background: none;
    border: none;
  }
  span {
    color: white;
    font-size: 1.6rem;
    font-weight: 700;
    user-select: none;
    opacity: 0.8;
    margin-left: 1rem;
    vertical-align: middle;
    cursor: pointer;
  }
  svg {
    vertical-align: middle;

    path:first-child {
      fill: white;
    }
  }
`;
