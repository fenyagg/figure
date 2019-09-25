import React from 'react';
import { ISvgFigureProps } from './ISvgFigureProps';

const Triangle: React.FC<ISvgFigureProps> = ({
  insideEvents = {},
  insideClassName,
  ...props
}) => {
  return (
    <svg viewBox="-1 -1 32 32" {...props}>
      <polygon
        className={insideClassName}
        {...insideEvents}
        points="15,0 00,30 30,30"
      />
    </svg>
  );
};

export default Triangle;
