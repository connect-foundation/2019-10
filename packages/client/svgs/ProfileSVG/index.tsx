import React from 'react';

const SvgComponent = props => (
  <svg width={24} height={24} {...props}>
    <path
      d="M12 12a4 4 0 10-4-4 4 4 0 004 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
      fill="#fff"
    />
    <path d="M0 0h24v24H0z" fill="none" />
  </svg>
);

export default SvgComponent;
