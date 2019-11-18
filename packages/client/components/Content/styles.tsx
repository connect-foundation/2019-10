import styled from 'styled-components';
import { BREAKPOINT } from '../../constants';

export const Content = styled.main`
  flex-grow: 1;
  background-color: #303537;
`;

export const Container = styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
  ${props =>
    props.maxWidth
      ? `
        padding-top: 6.4rem;
    `
      : `
        padding-top: 12rem;
    `}

  @media only screen and (min-width: ${BREAKPOINT}px) {
    padding-top: 6.4rem;
    padding-left: 0rem;
    padding-right: 0rem;

    ${props =>
      props.maxWidth
        ? `
      max-width: ${props.maxWidth}px;
      margin: 0 auto;
      padding-left: 0;
    `
        : `
      padding-left: 22rem;
    `}
  }
`;
