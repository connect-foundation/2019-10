import styled from 'styled-components';

export const Loader = styled.div`
  display: flex;
  justify-content: ${props => props.justify};

  > div {
    width: 3rem !important;
    height: 3rem !important;
    color: rgba(255, 255, 255, 0.1);
  }
`;
