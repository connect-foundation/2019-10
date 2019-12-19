import styled from 'styled-components';

import { fontWeight, BREAKPOINT } from '../../constants';

export const VideoUploadCompleteModal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: #383d3f;
  padding: 4rem 3.7rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    width: 40rem;
    height: unset;
    padding: 4rem 5.5rem;
    border-radius: 0.5rem;
  }
`;

export const Title = styled.div`
  font-size: 2.2rem;
  font-weight: ${fontWeight.bold};
  text-align: center;
  color: white;
`;

export const CompleteSign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;

  svg {
    width: 5rem;
    height: 5rem;

    path:last-child {
      fill: green;
    }
  }
`;

export const Description = styled.div`
  color: white;
  font-size: 1.6rem;
  font-weight: ${fontWeight.regular};
  text-align: center;
  margin-bottom: 3rem;
`;

export const Button = styled.div`
  padding: 0.7rem 1.8rem;
  background-color: #02cf5d;
  color: white;
  font-size: 1.6rem;
  font-weight: ${fontWeight.bold};
  border-radius: 0.5rem;
  cursor: pointer;
`;
