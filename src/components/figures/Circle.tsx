import React from 'react';
import SVG, { ISVGProps } from './SVG';

const Circle: React.FC<ISVGProps> = props => {
  return (
    <SVG viewBox="0 0 30 30" {...props}>
      <ellipse cx="15" cy="15" rx="15" ry="15" />
    </SVG>
  );
};

export default Circle;
