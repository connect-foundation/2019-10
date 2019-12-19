import styled from 'styled-components';
import MaterialGrid from '@material-ui/core/Grid';
import { TextareaAutosize } from '@material-ui/core';

import { fontWeight, BREAKPOINT } from '../../constants';

export const Container = styled.div`
  margin-top: 4.8rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-top: 5.8rem;
  }
`;

/* window 의 넓이에 따라 변화하는 spacing을 정의해주기 위해 사용됨*/
export const ContainerGrid = styled(MaterialGrid)`
  && > .MuiGrid-item {
    padding: 20px;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      padding: 14px;
    }
  }
`;

export const File = styled.input.attrs({ type: 'file' })`
  display: none;
`;

export const Title = styled.div`
  margin-top: 4rem;
  margin-bottom: 2.8rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-top: 5rem;
  }

  svg {
    vertical-align: middle;
    margin-right: 1rem;
  }

  span {
    color: #ffffff;
    font-size: 2.2rem;
    font-weight: ${fontWeight.bold};
    vertical-align: middle;
    margin: 0;
  }
`;

export const PreviewVideo = styled.video`
  object-fit: contain;
  margin-bottom: 2.2rem;
  width: 100%;
  height: 16rem;
  padding: 0;
  outline: none;
`;

export const RequireMark = styled.div`
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  background-color: #02cf5d;
  margin: 0rem 0rem 0.9rem 0.2rem;
`;

export const Thumbnail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 16rem;
  margin-bottom: 2.2rem;
  background-color: #484c50;
  border-radius: 0.5rem;

  a {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0.5rem;
    }
  }

  svg {
    width: 3.2rem;
    height: 3.2rem;
    margin-bottom: 1rem;
  }

  path:last-child {
    fill: #989a9b;
  }

  span {
    font-size: 1.6rem;
    color: white;
    margin-bottom: 1.5rem;
  }

  button {
    padding: 0.4rem 1rem;
    background-color: #989a9b;
    border-radius: 0.5rem;
    color: #484c50;
    outline: none;
    border: none;
    font-size: 1.4rem;
    font-weight: ${fontWeight.bold};
    cursor: pointer;
  }
`;

export const ItemHead = styled.div`
  margin-bottom: 1rem;
`;

export const ItemBody = styled.div`
  margin-bottom: 2rem;
`;

export const ItemTitle = styled.span`
  vertical-align: middle;
  font-size: 1.6rem;
  font-weight: ${fontWeight.bold};
  color: white;
`;

export const ItemSubtitle = styled.span`
  vertical-align: middle;
  margin-left: 0.5rem;
  color: white;
  font-size: 1.4rem;
  opacity: 0.7;
`;

export const VideoTitle = styled.input`
  width: 100%;
  font-size: 1.6rem;
  color: white;
  padding: 0 1.6rem;

  height: 5rem;
  border-radius: 0.5rem;
  background-color: #484c50;
  border: none;
  outline: none;
  margin-bottom: 1rem;
`;

export const VideoDescription = styled(TextareaAutosize)`
  width: 100%;
  font-size: 1.6rem;
  color: white;
  padding: 1.6rem;
  line-height: 2.4rem;
  border-radius: 0.5rem;
  background-color: #484c50;
  border: none;
  outline: none;
  margin-bottom: 1rem;
  resize: unset;
`;

export const TagContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: row wrap;
  overflow: hidden;

  width: 100%;
  background-color: #484c50;
  border-radius: 0.5rem;
  margin-bottom: 4rem;
  padding: 0.8rem 0.8rem 0 0.8rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-bottom: 5rem;
  }
`;

export const TagInput = styled.input`
  display: inline-block;
  margin-bottom: 0.8rem;
  width: 100%;
  height: 3.4rem;
  overflow: visible;
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 1.6rem;
  color: white;
  padding: 0 0.8rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 3rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    justify-content: center;
    margin-bottom: 15rem;
  }
`;

export const Button = styled.button`
  width: calc(50% - 0.8rem);
  height: 4.4rem;
  outline: none;
  border: none;
  background-color: ${props => (props.primary ? '#02CF5D' : '#484C50')};
  border-radius: 0.5rem;
  color: white;
  font-size: 1.6rem;
  font-weight: ${fontWeight.bold};
  cursor: pointer;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    width: 15.8rem;
    margin: 0 1.2rem;
  }
`;

export const ValidationMessage = styled.span`
  font-size: 1.6rem;
  font-weight: ${fontWeight.bold};
  color: red;
`;
