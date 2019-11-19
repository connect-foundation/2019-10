import styled from 'styled-components';

import { BREAKPOINT } from '../../constants';

export const VideoInfo = styled.div`
  position: relative;
  padding: 2rem 0;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    padding: 4rem 0 3rem 0;
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

export const ViewsAndDates = styled.div`
  span {
    font-size: 1.4rem;
    font-weight: 400;
    color: white;
  }

  span.dot {
    padding: 0 0.3rem;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: white;
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    font-size: 2.2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;

export const Tags = styled.div`
  margin-bottom: 2rem;
  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-bottom: 0rem;
  }
`;

export const Tag = styled.div`
  user-select: none;
  display: inline-block;
  padding: 0rem 1.4rem;
  height: 2.2rem;
  line-height: 2.2rem;
  font-size: 1.4rem;
  font-weight: 400;
  color: white;
  background: #484c50;
  border-radius: 10rem;
  margin-right: 1rem;
`;

export const Like = styled.div`
  display: inline-block;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    position: absolute;
    top: 3rem;
    right: 0;
  }

  div {
    width: 3rem;
    height: 3rem;
    border-radius: 10rem;
    background-color: #484c50;
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.8rem;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      width: 3.6rem;
      height: 3.6rem;
      margin-right: 1rem;
    }

    svg {
      margin: 0.6rem;
      margin-top: 0.7rem;
      width: 1.8rem;
      height: 1.8rem;
      @media only screen and (min-width: ${BREAKPOINT}px) {
        width: 2.4rem;
        height: 2.4rem;
      }

      path:nth-child(2) {
        fill: white;
      }
    }
  }

  span {
    vertical-align: middle;
    color: white;
    font-size: 1.4rem;
    font-weight: 700;
  }
`;