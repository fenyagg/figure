import React from 'react';
import { ISvgFigureProps } from './ISvgFigureProps';

const Square: React.FC<ISvgFigureProps> = ({
  insideEvents = {},
  insideClassName,
  ...props
}) => {
  return (
    <svg viewBox="-1 -1 32 32" {...props}>
      <rect
        className={insideClassName}
        {...insideEvents}
        width="30"
        height="30"
      />
    </svg>
  );
};
export default Square;
