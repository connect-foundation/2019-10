import styled from 'styled-components';
import { BREAKPOINT } from '../../constants';
import MaterialGrid from '@material-ui/core/Grid';

export const SignUp = styled.div`
  height: 100%;
  user-select: none;
`;
export const ContainerGrid = styled(MaterialGrid)`
  background-color: #303537;
  padding: 8rem 2rem 0 2rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    padding: 12rem 0 0 0;
  }
`;

export const HeadMessage = styled.div`
  width: 100%;
  text-align: center;
  color: white;
  font-size: 2.8rem;
  font-weight: bold;
  margin-bottom: 5.5rem;
  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-bottom: 6rem;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  vertical-align: top;
`;

export const RequireMark = styled.div`
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  background-color: #02cf5d;
  margin: 0rem 0rem 0.9rem 0.2rem;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 58.8rem;

  input[type='text'] {
    display: block;
    background-color: #484c50;
    width: 100%;
    height: 5rem;
    border: none;
    border-radius: 0.5rem;
    margin-bottom: 3rem;
    color: white;
    padding: 1rem;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      max-width: 58.8rem;
    }
  }

  input[type='checkbox'] {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #484c50;
    margin: 0;
    margin-right: 1rem;
    vertical-align: middle;
  }

  textarea {
    display: block;
    width: 100%;
    height: 12rem;
    resize: unset;
    background-color: #484c50;
    border: none;
    border-radius: 0.5rem;
    margin-bottom: 3rem;
    color: white;
    padding: 1rem;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      max-width: 58.8rem;
    }
  }
`;

export const Label = styled.div`
  display: inline-block;
  margin-bottom: 1rem;

  label {
    color: white;
    font-size: 1.6rem;
    font-weight: bold;
    margin-right: 0.5rem;
  }
  span {
    display: inline-block;
    color: white;
    font-size: 1.4rem;
    opacity: 0.7;
  }
  .agreement {
    display: inline-block;
    color: white;
    font-size: 1.6rem;
    font-weight: bold;
    font-weight: normal;
    vertical-align: middle;
  }
`;

export const SubmitButton = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 3rem;
  cursor: pointer;

  button {
    width: 15.8rem;
    height: 4.4rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.6rem;
    font-weight: bold;
    color: white;
    background-color: #02cf5d;
  }

  button:disabled {
    /* 추후 디자인 추가되면 색상 변경해야함 */
    color: white;
    background-color: gray /*#02cf5d*/;
  }

  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-top: 4rem;
  }
`;
