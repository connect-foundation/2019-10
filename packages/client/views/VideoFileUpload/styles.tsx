import styled from 'styled-components';
import { BREAKPOINT } from '../../constants';

export const Title = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;

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
    font-weight: bold;
    vertical-align: middle;
    margin: 0;
  }
`;

export const FileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 20rem;
  background-color: #484c50;
  border-radius: 0.5rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    height: 26rem;
  }

  svg {
    width: 4.6rem;
    height: 4.6rem;
    margin-bottom: 1.5rem;

    path:last-child {
      fill: #989a9b;
    }

    @media only screen and (min-width: ${BREAKPOINT}px) {
      width: 7.8rem;
      height: 7.8rem;
      margin-bottom: 1rem;
    }
  }
`;

export const BrowserText = styled.div`
  display: none;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    display: block;
    color: #ffffff;
    font-size: 1.6rem;
    margin-bottom: 2rem;
  }
`;

export const MobileText = styled.div`
  color: #ffffff;
  font-size: 1.6rem;
  margin-bottom: 2rem;
  display: block;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    display: none;
  }
`;

export const File = styled.input.attrs({ type: 'file' })`
  display: none;
`;

export const UploadButton = styled.button`
  padding: 0 3rem;
  height: 3.2rem;
  background-color: #989a9b;
  border-radius: 0.5rem;
  border: none;
  color: #484c50;
  font-weight: bold;
  font-size: 1.6rem;
  cursor: pointer;
`;
