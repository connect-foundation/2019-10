import styled from 'styled-components';
import { BREAKPOINT } from '../../constants';

export const ArrowBack = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 1rem;
  display: ${props => (props.isActive ? 'block' : 'none')};
  @media only screen and (min-width: ${BREAKPOINT}px) {
    display: none;
  }
`;

export const Input = styled.div`
  width: 100%;
  height: 3.2rem;
  background-color: #484c50;
  border-radius: 0.5rem;
  align-items: center;
  position: relative;
  display: ${props => (props.isActive ? 'flex' : 'none')};
  padding-left: 4rem;
  padding-right: 2rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    display: block;
    max-width: 28rem;
    flex: 1;
    padding-left: 4.3rem;
    padding-right: 2rem;
  }

  svg {
    position: absolute;
    left: 1rem;
    top: calc(50% - 10px);
    vertical-align: middle;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      left: 1.3rem;
    }
  }

  input {
    border-radius: 0.5rem;
    width: 100%;
    height: 100%;
    background-color: #484c50;
    vertical-align: middle;
    font-size: 1.6rem;
    color: white;
    border: none;
    outline: none;
    padding: 0;
  }
`;
