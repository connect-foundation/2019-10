import styled from 'styled-components';
import { BREAKPOINT, fontWeight } from '../../constants';

export const CommentForm = styled.div`
  margin-bottom: 4rem;

  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-bottom: 5rem;
  }
`;

export const User = styled.div`
  margin-bottom: 1rem;

  img {
    width: 4rem;
    height: 4rem;
    border-radius: 100%;
    vertical-align: middle;
    margin-right: 1.6rem;
  }

  span {
    color: white;
    font-size: 1.6rem;
    font-weight: ${fontWeight.bold};
    vertical-align: middle;
  }
`;

export const Form = styled.form`
  textarea {
    width: 100%;
    height: 5rem;
    resize: unset;
    font-size: 1.6rem;
    line-height: 2.4rem;
    color: white;
    padding: 1.3rem 1.6rem;
    border: 0;
    border-radius: 0.5rem;
    background-color: #484c50;
  }

  div {
    margin-top: 1rem;
    display: flex;
    justify-content: flex-end;

    button {
      background: unset;
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
