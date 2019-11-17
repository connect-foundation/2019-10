import styled from 'styled-components';

import { BREAKPOINT } from '../../constants';

export const VideoMeta = styled.div`
  position: relative;
  padding: 2rem 0rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    padding: 3rem 0;
  }

  &&:after {
    position: absolute;
    content: '';
    display: block;
    height: 2rem;
    border-bottom: 0.1rem solid #484c50;
    width: calc(100% + 4rem);
    left: -2rem;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      height: 3rem;
    }
  }
`;

export const User = styled.div`
  margin-bottom: 1.6rem;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
    vertical-align: middle;
    margin-right: 1.6rem;
  }

  span {
    color: white;
    font-size: 1.6rem;
    font-weight: 700;
    vertical-align: middle;
  }
`;

export const Description = styled.div`
  font-size: 1.6rem;
  line-height: 2.1rem;
  color: white;
`;
