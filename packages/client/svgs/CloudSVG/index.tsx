import React from 'react';

const SvgComponent = props => (
  <svg width={24} height={24} {...props}>
    <path d="M0 0h24v24H0z" fill="none" />
    <path
      d="M19.35 10.04a7.492 7.492 0 00-14-2A6 6 0 006 20h13a4.986 4.986 0 00.35-9.96zM14 13v4h-4v-4H7l5-5 5 5z"
      fill="#fff"
    />
  </svg>
);

export default SvgComponent;
