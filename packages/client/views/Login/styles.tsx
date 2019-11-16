import styled from 'styled-components';
import { BREAKPOINT } from '../../constants';

export const Container = styled.div`
  height: 100%;
  background-color: #303537;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12rem 2.2rem 0 2.2rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    padding: 24rem 0 0 0;
  }
`;

export const Message = styled.div`
  width: 31.6rem;
  height: 10rem;
  text-align: center;
  font-size: 1.5rem;
  color: white;
  opacity: 75%;
  margin-top: 3.1rem;
  margin-bottom: 20.8rem;
  @media only screen and (min-width: ${BREAKPOINT}px) {
    width: 43rem;
    margin-bottom: 8rem;
  }
`;

export const AuthenticateButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 32rem;
  height: 5.4rem;
  background-color: #222222;
  text-align: center;
  border-radius: 3.4rem;
  cursor: pointer;

  svg {
    margin-right: 1.6rem;
  }

  span {
    color: white;
    font-size: 1.5rem;
  }
`;
