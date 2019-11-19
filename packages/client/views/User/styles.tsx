import styled from 'styled-components';

import MaterialGrid from '@material-ui/core/Grid';

import { BREAKPOINT } from '../../constants';
import Filters from '../../components/Filters';

export const Container = styled.div`
  position: relative;
`;

export const Videos = styled.div`
  padding: 2rem 0rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    padding: 3rem 0;
  }
`;

export const Title = styled.div`
  font-size: 2rem;
  color: white;
  font-weight: 700;
  margin-bottom: 2rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    font-size: 2.2rem;
    margin-bottom: 3rem;
  }
`;

export const StyledFilters = styled(Filters)`
  margin-bottom: 3rem;
  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-bottom: 2rem;
  }
`;

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
