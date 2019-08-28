import React from 'react';

const Circle: React.FC<React.SVGProps<SVGSVGElement>> = props => {
  return (
    <svg viewBox="-1 -1 32 32" {...props}>
      <ellipse cx="15" cy="15" rx="15" ry="15" />
    </svg>
  );
};

export default Circle;
