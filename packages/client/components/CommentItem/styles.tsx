import styled from 'styled-components';
import { BREAKPOINT, fontWeight } from '../../constants';

export const CommentItem = styled.div`
  margin-bottom: ${props => (props.reply ? '3rem' : '4rem')};

  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-bottom: ${props => (props.reply ? '3rem' : '5rem')};
  }
`;

export const User = styled.div`
  margin-bottom: 1rem;

  img {
    width: ${props => (props.reply ? '3rem' : '4rem')};
    height: ${props => (props.reply ? '3rem' : '4rem')};
    border-radius: 100%;
    vertical-align: middle;
    margin-right: 1.3rem;
  }

  span {
    color: white;
    font-size: 1.6rem;
    font-weight: ${fontWeight.bold};
    vertical-align: middle;
  }

  span.dates-ago {
    font-size: 1.4rem;
    color: white;
    opacity: 0.5;
    font-weight: ${fontWeight.regular};
    margin-left: 1rem;
  }
`;

export const Description = styled.div`
  font-size: 1.6rem;
  line-height: 2.1rem;
  color: white;
  margin-bottom: 1rem;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;

  button {
    user-select: none;
    background-color: unset;
    border: unset;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    font-weight: ${fontWeight.bold};
    color: white;
    opacity: 0.5;

    svg {
      width: 2rem;
      height: 2rem;
      vertical-align: middle;
      path:nth-child(2) {
        opacity: 0.5;
        fill: white;
      }
    }

    span.likes {
      vertical-align: middle;

      margin-left: 0.3rem;
    }

    span {
    }
  }

  span.dot {
    user-select: none;
    color: white;
    opacity: 0.5;
    padding: 0 0.3rem;
    vertical-align: middle;
  }
`;

export const ShowRepliesButton = styled.div`
  margin-top: 1rem;

  button {
    background: none;
    border: 0;
    padding: 0;
    margin: 0;

    svg {
      vertical-align: middle;
      margin-right: 0.5rem;
      path:first-child {
        fill: white;
        opacity: 0.8;
      }
    }

    span {
      vertical-align: middle;
      font-size: 1.5rem;
      font-weight: ${fontWeight.bold};
      color: white;
      opacity: 0.8;
    }
  }
`;

export const Replies = styled.div`
  padding-top: 3rem;
  padding-left: 5rem;
`;
