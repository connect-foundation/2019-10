import styled from 'styled-components';
import { BREAKPOINT } from '../../constants';

export const VideoItem = styled.div`
  width: 100%;
  margin-bottom: 1.4rem;
  cursor: pointer;
  user-select: none;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-bottom: 2.6rem;
  }
`;

export const Thumbnail = styled.div`
  position: relative;
  margin-left: -2rem;
  width: calc(100% + 4rem);
  padding-top: 56.25%;
  background-color: black;
  overflow: hidden;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-left: 0;
    width: 100%;
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
`;

export const Details = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  margin-top: 1rem;
`;

export const Avatar = styled.div`
  margin-right: 1rem;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
    background-color: red;
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
  font-size: 1.6rem;
  font-weight: 800;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    font-size: 1.5rem;
  }
`;

export const Username = styled.div`
  font-size: 1.4rem;
  display: inline-block;
`;

export const Additionals = styled.div`
  span {
    font-size: 1.2rem;
  }
`;
