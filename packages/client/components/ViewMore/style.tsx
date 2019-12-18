import styled from 'styled-components';
import { fontWeight } from '../../constants';

export const ViewMore = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.3rem;
  button {
    background: none;
    border: none;
  }
  span {
    color: white;
    font-size: 1.6rem;
    font-weight: ${fontWeight.bold};
    user-select: none;
    opacity: 0.8;
    margin-left: 1rem;
    vertical-align: middle;
    cursor: pointer;
  }
  svg {
    vertical-align: middle;
    opacity: 0.8;
    path:first-child {
      fill: white;
    }
  }
`;
