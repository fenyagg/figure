import React from 'react';

const Triangle: React.FC<React.SVGProps<SVGSVGElement>> = props => {
  return (
    <svg viewBox="-1 -1 32 32" {...props}>
      <polygon points="15,0 00,30 30,30" />
    </svg>
  );
};

export default Triangle;
