import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  margin: 0 2rem;
`;

export const Title = styled.div`
  margin: 4rem 0;

  span {
    margin-left: 1rem;
    color: white;
    font-size: 2.2rem;
    font-weight: bold;
    vertical-align: middle;
  }

  svg {
    vertical-align: middle;

    path:first-child {
      fill: white;
    }
  }
`;
