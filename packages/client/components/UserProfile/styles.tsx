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
  }
`;

export const Avatar = styled.div`
  margin-bottom: 4rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-right: 5rem;
  }

  img {
    width: 12rem;
    height: 12rem;
    border-radius: 100%;

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
    font-size: 2.8rem;
    font-weight: ${fontWeight.extraBold};
    color: white;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      margin-bottom: 2rem;
      font-size: 3.2rem;
    }
  }

  div {
    font-size: 1.6rem;
    font-weight: ${fontWeight.regular};
    color: white;
    opacity: 0.7;
  }
`;
