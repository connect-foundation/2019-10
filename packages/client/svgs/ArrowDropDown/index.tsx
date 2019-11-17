import React from 'react';

const SvgComponent = props => (
  <svg width={24} height={24} {...props}>
    <path d="M7 10l5 5 5-5z" />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export default SvgComponent;
