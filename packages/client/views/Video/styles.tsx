import styled from 'styled-components';
import { BREAKPOINT } from '../../constants';
import Filters from '../../components/Filters';

export const Video = styled.div`
  background: black;

  width: calc(100% + 4rem);
  margin-left: -2rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    width: 100vw;
    margin-left: calc((100% - 100vw) / 2);
  }

  video {
    display: block;
    width: 100%;
    max-width: 96rem;
    margin: 0 auto;
    height: auto;
    outline: unset;
  }
`;

export const Details = styled.div``;

export const Comments = styled.div`
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
  margin-bottom: 2rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-bottom: 3rem;
  }
`;
