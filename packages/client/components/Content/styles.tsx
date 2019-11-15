import styled from "styled-components";
import { BREAKPOINT } from "../../constants";

export const Content = styled.main`
  flex-grow: 1;
  width: 100%;
  height: 100%;
  background-color: #303537;
  margin-top: 12rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-top: 6.4rem;
    margin-left: 25rem;
  }
`;
