import styled from 'styled-components';

export const TagLabel = styled.div`
  margin: 0 1rem 0.8rem 0;

  background-color: #303537;
  display: flex;
  align-items: center;

  border-radius: 0.5rem;
  line-height: 3.4rem;
  padding: 0 0.8rem 0 1.6rem;

  svg {
    width: 1.6rem;
    height: 1.6rem;
    cursor: pointer;

    path:first-child {
      fill: white;
    }
  }
`;

export const TagName = styled.span`
  font-size: 1.6rem;
  color: white;
  margin-right: 0.8rem;
`;
