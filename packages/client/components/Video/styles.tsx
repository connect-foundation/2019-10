import styled from 'styled-components';

export const Video = styled.div`
  width: 100%;
  margin-bottom: 1.4rem;
`;

export const Thumbnail = styled.div`
  position: relative;
  margin-left: -2rem;
  width: calc(100% + 4rem);
  padding-top: 56.25%;
  background-color: black;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    margin: auto;
  }
`;

export const Details = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: row;
  margin-top: 1rem;
`;

export const Avatar = styled.div`
  margin-right: 1rem;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
    background-color: red;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  color: white;
`;

export const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 800;
`;

export const Username = styled.div`
  font-size: 1.4rem;
`;

export const Additionals = styled.div`
  span {
    font-size: 1.2rem;
  }
`;
