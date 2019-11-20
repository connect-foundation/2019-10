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
  padding-left: 1rem;
  align-items: center;
  display: ${props => (props.isActive ? 'flex' : 'none')};
  @media only screen and (min-width: ${BREAKPOINT}px) {
    display: flex;
    width: 28rem;
  }
  svg {
    vertical-align: middle;
  }
  input {
    width: 100%;
    background-color: #484c50;
    vertical-align: middle;
    font-size: 1.6rem;
    margin-left: 1rem;
    color: white;
    border: none;
    outline: none;
  }
`;
