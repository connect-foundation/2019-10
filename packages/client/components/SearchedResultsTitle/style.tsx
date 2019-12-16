import styled from 'styled-components';
import { BREAKPOINT, fontWeight } from '../../constants';

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
    font-weight: ${fontWeight.bold};
    vertical-align: middle;
  }
  svg {
    vertical-align: middle;
    path:first-child {
      fill: white;
    }
  }
`;
