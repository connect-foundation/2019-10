import styled from 'styled-components';
import MaterialGrid from '@material-ui/core/Grid';

import { BREAKPOINT } from '../../constants';

export const Login = styled.div`
  height: 100%;
  user-select: none;
`;

export const ContainerGrid = styled(MaterialGrid)`
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
  width: 100%;
  text-align: center;
  font-size: 1.6rem;
  color: white;
  margin-top: 3.1rem;
  margin-bottom: 20.8rem;
  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-bottom: 8rem;
  }
`;

export const AuthenticateLink = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.4rem;
  background-color: #222222;
  border-radius: 3.4rem;
  text-decoration: none;
  cursor: pointer;

  svg {
    margin-right: 1.6rem;
  }

  span {
    color: white;
    font-size: 1.5rem;
  }
  @media only screen and (min-width: ${BREAKPOINT}px) {
    max-width: 32rem;
  }
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Link = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
