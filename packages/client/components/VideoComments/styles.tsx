import styled from 'styled-components';
import { BREAKPOINT, fontWeight } from '../../constants';
import Tabs from '../Tabs';

import MaterialCircularProgress from '@material-ui/core/CircularProgress';

export const VideoComments = styled.div`
  padding: 2rem 0rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    padding: 3rem 0;
  }
`;

export const Title = styled.div`
  font-size: 2rem;
  color: white;
  font-weight: ${fontWeight.bold};
  margin-bottom: 2rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    font-size: 2.2rem;
    margin-bottom: 3rem;
  }
`;

export const StyledTabs = styled(Tabs)`
  && {
    margin-bottom: 2rem;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      margin-bottom: 3rem;
    }
  }
`;

export const CircularProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 3rem 0 3rem 0;
`;

export const CircularProgress = styled(MaterialCircularProgress)`
  && {
    width: 3.6rem !important;
    height: 3.6rem !important;
    color: rgba(255, 255, 255, 0.1);
  }
`;
