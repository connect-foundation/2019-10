import styled from 'styled-components';
import MaterialCircularProgress from '@material-ui/core/CircularProgress';

import { BREAKPOINT, fontWeight } from '../../constants';
import { ArrowDropDownSVG, SubdirectoryArrowRightSVG } from '../../svgs';
import CommentForm from '../CommentForm';

export const CommentItem = styled.div`
  margin-bottom: ${props => (props.reply ? '3rem' : '4rem')};
  display: flex;
  align-items: flex-start;

  ${props =>
    props.reply &&
    `
  &&:last-child {
    margin-bottom: 0;
  }
  `}


  @media only screen and (min-width: ${BREAKPOINT}px) {
    margin-bottom: ${props => (props.reply ? '4rem' : '5rem')};
  }
`;

export const Avatar = styled.div`
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    vertical-align: middle;
    margin-right: 1.3rem;
    cursor: pointer;

    @media only screen and (min-width: ${BREAKPOINT}px) {
      width: ${props => (props.reply ? '3rem' : '3.6rem')};
      height: ${props => (props.reply ? '3rem' : '3.6rem')};
    }
  }
`;

export const Content = styled.div`
  width: 100%;
`;

export const User = styled.div`
  margin-bottom: 1rem;

  span {
    color: white;
    font-size: 1.5rem;
    font-weight: ${fontWeight.bold};
    vertical-align: middle;
    cursor: pointer;
  }

  span.dates-ago {
    font-size: 1.4rem;
    color: rgba(255, 255, 255, 0.6);
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
    outline: unset;
    font-size: 1.5rem;
    font-weight: ${fontWeight.bold};
    color: rgba(255, 255, 255, 0.6);

    span {
      vertical-align: middle;
    }
  }

  span.dot {
    user-select: none;
    color: white;
    opacity: 0.5;
    padding: 0 0.5rem;
    vertical-align: middle;
  }
`;

export const Like = styled.button`
  svg {
    width: 2rem;
    height: 2rem;
    vertical-align: middle;
    path:nth-child(2) {
      fill: ${props => (props.active ? '#02cf5d' : '#acaeaf')};
    }
  }

  span {
    color: ${props => (props.active ? '#02cf5d' : 'inherit')};
    vertical-align: middle;
    margin-left: 0.5rem;
  }
`;

export const StyledCommentForm = styled(CommentForm)`
  margin-bottom: 0rem;
  padding-top: 3rem;
`;

export const MoreRepliesButton = styled.div`
  margin-top: 2rem;
  button {
    background: none;
    border: 0;
    padding: 0;
    margin: 0;

    svg {
      vertical-align: middle;
      margin-right: 0.5rem;
    }

    span {
      vertical-align: middle;
      font-size: 1.5rem;
      font-weight: ${fontWeight.bold};
      color: white;
      opacity: 1;
    }
  }
`;

export const LoadMoreRepliesButton = styled.div`
  margin-top: -2rem;
  button {
    background: none;
    border: 0;
    padding: 0;
    margin: 0;

    svg {
      vertical-align: middle;
      margin-right: 0.5rem;
    }

    span {
      vertical-align: middle;
      font-size: 1.5rem;
      font-weight: ${fontWeight.bold};
      color: white;
      opacity: 1;
    }
  }
`;

export const StyledArrowDropDownSVG = styled(ArrowDropDownSVG)`
  path:first-child {
    fill: white;
  }
`;

export const StyledSubdirectoryArrowRightSVG = styled(
  SubdirectoryArrowRightSVG,
)`
  width: 2rem;
  height: 2rem;
  path:last-child {
    fill: white;
  }
`;

export const Replies = styled.div`
  padding-top: 3rem;
`;

export const Loader = styled.div`
  display: flex;
  justify-content: flex-start;

  > div {
    width: 3rem !important;
    height: 3rem !important;
    color: rgba(255, 255, 255, 0.1);
  }
`;
