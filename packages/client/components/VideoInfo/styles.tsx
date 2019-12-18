import styled from 'styled-components';

import { BREAKPOINT, fontWeight } from '../../constants';

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
    margin-left: -2rem;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      width: 100%;
      margin-left: 0;
      height: 3rem;
    }
  }
`;

export const ViewsAndDates = styled.div`
  span {
    font-size: 1.4rem;
    font-weight: ${fontWeight.regular};
    color: white;
  }

  span.dot {
    padding: 0 0.3rem;
  }
`;

export const ViewsAndDatesSkeleton = styled.div`
  > div {
    width: 18rem;
    height: 2rem;
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

export const TitleSkeleton = styled.div`
  > div {
    margin-top: 0.8rem;
    margin-bottom: 0.8rem;
    width: 25rem;
    height: 2.8rem;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      margin-top: 1rem;
      margin-bottom: 1rem;
      height: 3.2rem;
    }
  }
`;

export const Tags = styled.div`
  margin-bottom: 2rem;
  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-bottom: 0rem;
  }
`;

export const TagsSkeleton = styled.div`
  display: flex;
  margin-bottom: 2rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-bottom: 0rem;
  }

  > div {
    width: 8rem;
    height: 2.2rem;
    margin-right: 1rem;
    border-radius: 100rem;
  }
`;

export const Tag = styled.div`
  user-select: none;
  display: inline-block;
  padding: 0rem 1.4rem;
  height: 2.2rem;
  line-height: 2.2rem;
  font-size: 1.4rem;
  font-weight: ${fontWeight.regular};
  color: white;
  background: #484c50;
  border-radius: 10rem;
  margin-right: 1rem;
`;

export const Like = styled.button`
  z-index: 1;
  display: inline-block;
  background: unset;
  border: unset;
  outline: none;
  padding: 0.5rem;
  margin: -0.5rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    position: absolute;
    bottom: 2.3rem;
    right: 0rem;
  }

  div {
    width: 3rem;
    height: 3rem;
    border-radius: 10rem;
    background-color: ${props => (props.active ? '#02cf5d' : '#484c50')};
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
        width: 2rem;
        height: 2rem;
        margin: 0.8rem;
      }

      path:nth-child(2) {
        fill: ${props => (props.active ? 'white' : '#acaeaf')};
      }
    }
  }

  span {
    vertical-align: middle;
    color: ${props => (props.active ? 'white' : 'rgba(255, 255, 255, 0.6)')};
    font-size: 1.5rem;
    font-weight: ${fontWeight.bold};
  }
`;

export const LikeSkeleton = styled.div`
  display: flex;
  align-items: center;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    position: absolute;
    bottom: 2.3rem;
    right: 0;
  }

  .MuiSkeleton-circle {
    width: 3rem;
    height: 3rem;
    margin-right: 0.5rem;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      width: 3.6rem;
      height: 3.6rem;
      margin-right: 1rem;
    }
  }

  .MuiSkeleton-text {
    width: 7rem;
    height: 2.4rem;
  }

  .MuiSkeleton-text:empty:before {
    content: '';
  }
`;
