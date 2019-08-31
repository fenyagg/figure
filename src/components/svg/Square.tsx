import React from 'react';

const Square: React.FC<React.SVGProps<SVGSVGElement>> = props => {
  return (
    <svg viewBox="-1 -1 32 32" {...props}>
      <rect width="30" height="30" />
    </svg>
  );
};
export default Square;
