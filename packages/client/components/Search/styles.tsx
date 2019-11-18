import styled from 'styled-components';
import MaterialAppBar from '@material-ui/core/AppBar';

export const Search = styled(MaterialAppBar)`
  && {
    background-color: #383d3f;
    color: white;
    position: fixed;
    z-index: 2;
    box-shadow: none;
  }
`;

export const Container = styled.div`
  padding: 0 2rem;
  display: flex;
  height: 6.4rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ArrawBack = styled.div`
  width: 2.4rem;
  height: 2.4rem;
`;

export const InputLayer = styled.div`
  width: 28.6rem;
  height: 3.2rem;
  background-color: #484c50;
  border-radius: 5px;
`;
