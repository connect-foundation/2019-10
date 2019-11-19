import styled from 'styled-components';

export const NoSearchResults = styled.div`
  height: 100%;
`;

export const Image = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 20rem;
    height: 20rem;
    border-radius: 100%;
    background-color: red;
    vertical-align: middle;
  }
`;

export const Content = styled.div`
  margin-top: 6rem;
  display: flex;
  justify-content: center;
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
