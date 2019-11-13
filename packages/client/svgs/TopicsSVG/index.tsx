import React from 'react';

const TopicsSVG = props => (
  <svg width={24} height={24} {...props}>
    <g opacity={0.7}>
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        d="M17.63 5.84A1.994 1.994 0 0016 5L5 5.01A2 2 0 003 7v10a2 2 0 002 1.99L16 19a1.994 1.994 0 001.63-.84L22 12l-4.37-6.16z"
        fill="#fff"
      />
    </g>
  </svg>
);

export default TopicsSVG;
