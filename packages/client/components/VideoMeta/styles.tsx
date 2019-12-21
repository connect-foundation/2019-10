import styled from 'styled-components';

import { BREAKPOINT, fontWeight } from '../../constants';

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
    margin-left: -2rem;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      width: 100%;
      margin-left: 0;
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
    cursor: pointer;
  }

  span {
    color: white;
    font-size: 1.6rem;
    font-weight: ${fontWeight.bold};
    vertical-align: middle;
    cursor: pointer;
  }
`;

export const UserSkeleton = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.6rem;

  .MuiSkeleton-circle {
    width: 4rem;
    height: 4rem;
    margin-right: 1.6rem;
  }

  .MuiSkeleton-text {
    width: 8rem;
    height: 2.4rem;
  }
`;

export const Description = styled.div`
  font-size: 1.6rem;
  line-height: 2.1rem;
  color: white;
`;

export const DescriptionSkeleton = styled.div`
  > div {
    height: 2.4rem;
  }
`;
