import styled from 'styled-components';
import { BREAKPOINT, fontWeight } from '../../constants';
import { TextareaAutosize } from '@material-ui/core';

export const CommentForm = styled.div`
  width: 100%;
  margin-bottom: 4rem;
  display: flex;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-bottom: 5rem;
  }
`;

export const User = styled.div`
  margin-bottom: 1rem;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    vertical-align: middle;
    margin-right: 1.3rem;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      width: 3.6rem;
      height: 3.6rem;
    }
  }
`;

export const Form = styled.form`
  width: 100%;

  > div {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;

    button {
      background: unset;
      width: 6.7rem;
      height: 3.2rem;
      line-height: 3.4rem;
      padding: 0 1.8rem;
      border: 0;
      border-radius: 0.5rem;
      font-size: 1.6rem;
      font-weight: ${fontWeight.bold};
      color: white;
    }

    button[type='button'] {
      opacity: 0.5;
      margin-right: 1rem;
    }
    button[type='submit'] {
      background-color: #02cf5d;
    }
  }
`;

export const StyledTextarea = styled(TextareaAutosize)`
  font-size: 1.6rem;
  line-height: 2.4rem;
  background-color: #484c50;
  width: 100%;
  border: 0;
  outline: 0;
  color: white;
  resize: unset;
  padding: 1.3rem 1.6rem;
  border-radius: 0.5rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
  }
`;
