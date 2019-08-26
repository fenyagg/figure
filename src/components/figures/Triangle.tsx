import React from 'react';
import SVG, { ISVGProps } from './SVG';

const Triangle: React.FC<ISVGProps> = props => {
  return (
    <SVG viewBox="0 0 30 30" {...props}>
      <polygon points="15,0 0,30 30,30" />
    </SVG>
  );
};

export default Triangle;
