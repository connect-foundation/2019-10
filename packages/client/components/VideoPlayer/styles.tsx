import styled from 'styled-components';
import { BREAKPOINT } from '../../constants';

export const VideoPlayer = styled.div`
  background: black;
  width: calc(100% + 4rem);
  height: 36rem;
  margin-left: -2rem;
  display: flex;
  justify-content: center;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    width: 100vw;
    height: 54rem;
    margin-left: calc((100% - 100vw) / 2);
  }

  video {
    outline: none;
    display: block;
    height: 100%;
  }
`;
