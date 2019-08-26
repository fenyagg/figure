import React from 'react';
import SVG, { ISVGProps } from './SVG';

const Square: React.FC<ISVGProps> = props => {
  return (
    <SVG viewBox="0 0 30 30" {...props}>
      <rect width="30" height="30" />
    </SVG>
  );
};
export default Square;
