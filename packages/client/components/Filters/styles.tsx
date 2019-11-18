import styled from 'styled-components';

export const Filters = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    user-select: none;
    cursor: pointer;
    display: inline-block;
    font-size: 1.6rem;
    line-height: 1.8rem;
    padding: 0.8rem 0;
    font-weight: 700;
    color: white;
    margin-right: 2rem;
    opacity: 0.7;
  }

  li.active {
    opacity: 1;
    border-bottom: 0.2rem solid white;
  }
`;
