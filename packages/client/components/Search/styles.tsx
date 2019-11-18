import styled from 'styled-components';
import { BREAKPOINT } from '../../constants';

export const ArrowBack = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  display: ${props => (props.isActive ? 'block' : 'none')};
  @media only screen and (min-width: ${BREAKPOINT}px) {
    display: none;
  }
`;

export const InputLayer = styled.div`
  width: 28.6rem;
  height: 3.2rem;
  background-color: #484c50;
  border-radius: 0.5rem;
  padding-top: 0.2rem;
  padding-right: 1rem;
  padding-bottom: 0.2rem;
  padding-left: 1rem;
  align-items: center;
  display: ${props => (props.isActive ? 'block' : 'none')};
  @media only screen and (min-width: ${BREAKPOINT}px) {
    display: block;
  }
  svg {
    vertical-align: middle;
    width: 2rem;
    height: 2rem;
  }
  span {
    vertical-align: middle;
    font-size: 1.8rem;
    opacity: 0.7;
    margin-left: 1.17rem;
  }
`;
