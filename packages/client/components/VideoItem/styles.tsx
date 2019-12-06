import styled from 'styled-components';
import { BREAKPOINT, fontWeight, orientation } from '../../constants';

export const VideoItem = styled.div`
  user-select: none;
  cursor: pointer;
  width: 100%;

  ${props => {
    if (props.mobileType === orientation.vertical) {
      return `
        margin-bottom: 1.4rem;
      `;
    } else {
      return `
        display: flex;
        flex-direction: row;
      `;
    }
  }}

  @media only screen and (min-width: ${BREAKPOINT}px) {
    ${props => {
      if (props.desktopType === orientation.vertical) {
        return `
          display: inherit;
          margin-bottom: 2.6rem;
        `;
      } else {
        return `
          display: flex;
        `;
      }
    }}
  }

  && > a {
    ${props => {
      if (props.mobileType === orientation.vertical) {
        return ``;
      } else {
        return `
          flex: 1;
          margin-right: 0.8rem;
        `;
      }
    }}

    @media only screen and (min-width: ${BREAKPOINT}px) {
      ${props => {
        if (props.desktopType === orientation.vertical) {
          return ``;
        } else {
          return `
            margin-right: 1.2rem;
            flex: unset;
          `;
        }
      }}
    }
  }
`;

export const Thumbnail = styled.div`
  position: relative;
  padding-top: 56.25%;
  overflow: hidden;
  background-color: black;

  ${props => {
    if (props.mobileType === orientation.vertical) {
      return `
        margin-left: -2rem;
        width: calc(100% + 4rem);
      `;
    } else {
      return ``;
    }
  }}

  @media only screen and (min-width: ${BREAKPOINT}px) {
    ${props => {
      if (props.desktopType === orientation.vertical) {
        return `
          margin-left: 0;
          width: 100%;
        `;
      } else {
        return `
          width: 24.6rem;
        `;
      }
    }}
  }

  img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    margin: auto;
  }

  div {
    position: absolute;
    right: 0.5rem;
    bottom: 0.5rem;
    font-size: 1.2rem;
    padding: 0 0.5rem;
    color: white;
    font-weight: ${fontWeight.bold};
    background: rgba(0, 0, 0, 0.7);
    border-radius: 0.3rem;
    height: 2.3rem;
    line-height: 2.3rem;
  }
`;

export const ThumbnailSkeleton = styled.div`
  > div {
    padding-top: 56.25%;
    overflow: hidden;

    ${props => {
      if (props.mobileType === orientation.vertical) {
        return `
        margin-left: -2rem;
        width: calc(100% + 4.8rem);
      `;
      } else {
        return ``;
      }
    }}

    @media only screen and (min-width: ${BREAKPOINT}px) {
      ${props => {
        if (props.desktopType === orientation.vertical) {
          return `
          margin-left: 0;
          width: 100%;
        `;
        } else {
          return `
          width: 24.6rem;
        `;
        }
      }}
    }
  }
`;

export const Details = styled.div`
  ${props => {
    if (props.mobileType === orientation.vertical) {
      return `
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: row;
        margin-top: 1rem;
      `;
    } else {
      return `
        width: 100%;
        flex: 1;
        margin-left: 0.8rem;
      `;
    }
  }}

  @media only screen and (min-width: ${BREAKPOINT}px) {
    ${props => {
      if (props.desktopType === orientation.vertical) {
        return `
          display: flex;
          align-items: flex-start;
          margin-left: 0;
        `;
      } else {
        return `
          flex: unset;
          margin-left: 1.2rem;
        `;
      }
    }}
  }
`;

export const Avatar = styled.div`
  margin-right: 1rem;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
  }
`;

export const AvatarSkeleton = styled.div`
  margin-right: 1rem;

  > div {
    width: 4rem;
    height: 4rem;
  }
`;

export const Info = styled.div`
  color: white;
  width: 100%;
  min-width: 0;

  a {
    text-decoration: none;
    color: white;
  }
`;

export const Title = styled.div`
  /* https://stackoverflow.com/questions/5269713/css-ellipsis-on-second-line/19049457#19049457 */
  font-size: 1.5rem;
  font-weight: ${fontWeight.extraBold};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const TitleSkeleton = styled.div`
  > div {
    width: 100%;
    height: 2.25rem;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      width: 70%;
    }
  }
`;

export const Username = styled.div`
  font-size: 1.4rem;
  display: inline-block;
`;

export const UsernameSkeleton = styled.div`
  > div {
    width: 50%;
    height: 2.1rem;
  }
`;

export const Additionals = styled.div`
  span {
    font-size: 1.2rem;
  }
`;

export const AdditionalsSkeleton = styled.div`
  > div {
    width: 50%;
    height: 1.8rem;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      width: 30%;
    }
  }
`;
