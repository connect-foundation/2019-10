import styled from 'styled-components';

export const Loader = styled.div`
  display: flex;
  justify-content: ${props => props.justify};

  > div {
    width: ${props => props.size}rem !important;
    height: ${props => props.size}rem !important;
    color: ${props => props.color};
  }
`;
