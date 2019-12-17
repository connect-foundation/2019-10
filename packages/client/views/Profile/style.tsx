import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';
import MaterialGrid from '@material-ui/core/Grid';
import MaterialCircularProgress from '@material-ui/core/CircularProgress';

import { BREAKPOINT } from '../../constants';

export const Profile = styled.div``;

export const ContainerGrid = styled(MaterialGrid)``;

export const Title = styled.div`
  margin: 4rem 0;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin: 5rem 0 4rem 0;
  }

  span {
    margin-left: 1rem;
    color: white;
    font-size: 2.2rem;
    font-weight: bold;
    vertical-align: middle;
  }

  svg {
    vertical-align: middle;
  }
`;

export const Form = styled.div`
  margin-bottom: 3rem;
`;

export const Item = styled.div``;

export const Label = styled.div`
  label {
    font-size: 1.6rem;
    color: white;
    margin-right: 0.5rem;
  }
  span {
    display: inline-block;
    color: white;
    font-size: 1.4rem;
    opacity: 0.7;
  }
`;

export const AvatarItem = styled.div`
  display: flex;
  flex-direction: flex-start;
  align-items: center;
  height: 10rem;
  margin: 1rem 0 3rem 0;
  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin: 2rem 0 3rem 0;
  }

  input[type='file'] {
    display: none;
  }
`;

export const Avatar = styled.img`
  display: inline-block;
  width: 10rem;
  height: 10rem;
  border-radius: 100%;
  margin-right: 2rem;
`;

export const AvatarInputLabel = styled.div`
  display: flex;
  width: 8rem;
  height: 3rem;
  font-size: 1.6rem;
  color: #ffffffcc;
  background-color: #484c50;
  border: none;
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const UserNameInput = styled.input`
  display: block;
  background-color: #484c50;
  width: 100%;
  height: 5rem;
  border: none;
  border-radius: 0.5rem;
  color: white;
  padding: 1.6rem;
  margin-top: 1rem;
  margin-bottom: 3rem;
`;

export const DescriptionInput = styled.textarea`
  display: block;
  width: 100%;
  height: 12rem;
  resize: unset;
  background-color: #484c50;
  border: none;
  border-radius: 0.5rem;
  color: white;
  padding: 1.6rem;
  margin-top: 1rem;
  margin-bottom: 4rem;
  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-bottom: 5rem;
  }
`;

export const SubmitButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 3rem;
  cursor: pointer;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    width: 15.8rem;
    height: 4.4rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.6rem;
    font-weight: bold;
    color: white;
    background-color: #02cf5d;
  }
  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-top: 1rem;
  }
`;

export const RequireMark = styled.div`
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  background-color: #02cf5d;
  margin: 0rem 0rem 0.9rem 0.2rem;
`;

export const FormCircularProgress = styled(MaterialCircularProgress)`
  && {
    z-index: 900;
    width: 3rem !important;
    height: 3rem !important;
    color: rgba(255, 255, 255, 1);
  }
`;

export const AvatarCircularProgress = styled(MaterialCircularProgress)`
  && {
    z-index: 900;
    width: 2rem !important;
    height: 2rem !important;
    color: rgba(255, 255, 255, 1);
  }
`;

export const AvatarSkeleton = styled(Skeleton)`
  && {
    width: 10rem;
    height: 10rem;
    margin-right: 2rem;
  }
`;
