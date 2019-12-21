import styled from 'styled-components';
import { fontWeight } from '../../constants';

export const Tag = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #484c50;
  border-radius: 0.5rem;
  cursor: pointer;
`;

export const TagTitle = styled.div`
  font-size: 1.8rem;
  font-weight: ${fontWeight.bold};
  margin-bottom: 0.5rem;
`;

export const TagCount = styled.div`
  font-size: 1.6rem;
  font-weight: ${fontWeight.regular};
`;
