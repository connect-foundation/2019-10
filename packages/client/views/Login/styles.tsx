import styled from 'styled-components';
import MaterialGrid from '@material-ui/core/Grid';

import { BREAKPOINT, fontWeight } from '../../constants';

export const Login = styled.div`
  height: 100%;
  user-select: none;
`;

export const Container = styled.div`
  background-color: #303537;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18rem 2rem 0 2rem;
  @media only screen and (min-width: ${BREAKPOINT}px) {
    padding: 24rem 0 0 0;
  }
`;

export const ContainerGrid = styled(MaterialGrid)``;

export const Title = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2.8rem;
  font-weight: ${fontWeight.extraBold};
  color: white;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    font-size: 3.2rem;
  }
`;

export const Message = styled.div`
  width: 100%;
  text-align: center;
  font-size: 1.6rem;
  color: white;
  margin-top: 5rem;
  margin-bottom: 5.1rem;
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

export const Link = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
