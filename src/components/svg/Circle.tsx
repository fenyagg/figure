import React from 'react';
import { ISvgFigureProps } from './ISvgFigureProps';

const Circle: React.FC<ISvgFigureProps> = ({
  onClickInside,
  insideClassName,
  ...props
}) => {
  return (
    <svg viewBox="-1 -1 32 32" {...props}>
      <ellipse
        className={insideClassName}
        onClick={onClickInside}
        cx="15"
        cy="15"
        rx="15"
        ry="15"
      />
    </svg>
  );
};

export default Circle;
