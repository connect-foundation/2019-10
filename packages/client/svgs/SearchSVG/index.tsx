import React from 'react';

const SvgComponent = props => (
  <svg width={props.width} height={props.height} viewBox="0 0 24 24" {...props}>
    <path
      d="M14.785 14h-.745l-.264-.27a6.706 6.706 0 001.48-4.23A6.322 6.322 0 009.128 3 6.322 6.322 0 003 9.5 6.322 6.322 0 009.128 16a5.9 5.9 0 003.988-1.57l.255.28v.79l4.714 4.99L19.49 19zm-5.657 0a4.371 4.371 0 01-4.242-4.5A4.371 4.371 0 019.128 5a4.371 4.371 0 014.243 4.5A4.371 4.371 0 019.128 14z"
      fill="#fff"
    />
    <path d="M0 0h23v24H0z" fill="none" />
  </svg>
);

export default SvgComponent;
