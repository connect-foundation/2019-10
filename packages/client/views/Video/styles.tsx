import styled from 'styled-components';

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
