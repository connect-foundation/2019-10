import styled from 'styled-components';

import { BREAKPOINT, fontWeight } from '../../constants';

export const UserProfile = styled.div`
  padding: 5rem 0rem 3rem 0rem;
  position: relative;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    padding: 7rem 0rem 5rem 0rem;
  }

  &&:after {
    position: absolute;
    content: '';
    display: block;
    border-bottom: 0.1rem solid #484c50;
    height: 3rem;
    width: calc(100% + 4rem);
    left: -2rem;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      width: 100%;
      height: 5rem;
      left: 0;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const Avatar = styled.div`
  margin-bottom: 4rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-right: 5rem;
    margin-bottom: 0rem;
  }

  img {
    display: block;
    width: 12rem;
    height: 12rem;
    border-radius: 100%;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      width: 14rem;
      height: 14rem;
    }
  }
`;

export const AvatarSkeleton = styled.div`
  margin-bottom: 4rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-right: 5rem;
    margin-bottom: 0rem;
  }

  > div {
    width: 12rem;
    height: 12rem;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      width: 14rem;
      height: 14rem;
    }
  }
`;

export const Info = styled.div`
  width: 100%;

  h1 {
    margin: 0;
    margin-bottom: 1rem;
    font-size: 2.4rem;
    font-weight: ${fontWeight.extraBold};
    color: white;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      margin-bottom: 2rem;
      font-size: 2.8rem;
    }
  }

  div {
    font-size: 1.6rem;
    font-weight: ${fontWeight.regular};
    color: white;
    opacity: 0.7;
  }
`;

export const InfoSkeleton = styled.div`
  width: 100%;

  > div:first-child {
    width: 50%;
    height: 3.4rem;
    margin-bottom: 1rem;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      width: 20rem;
      height: 4rem;
      margin-bottom: 2rem;
    }
  }

  > div {
    height: 2.3rem;
  }

  > div:last-child {
    display: block;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      /* 데스크톱에서는 한 줄을 가립니다. */
      display: none;
    }
  }
`;
