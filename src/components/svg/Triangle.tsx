import React from 'react';
import { ISvgFigureProps } from './ISvgFigureProps';

const Triangle: React.FC<ISvgFigureProps> = ({
  onClickInside,
  insideClassName,
  ...props
}) => {
  return (
    <svg viewBox="-1 -1 32 32" {...props}>
      <polygon
        className={insideClassName}
        onClick={onClickInside}
        points="15,0 00,30 30,30"
      />
    </svg>
  );
};

export default Triangle;
