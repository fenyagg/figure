import React, { MouseEvent } from 'react';

export interface ISvgFigureProps extends React.SVGProps<SVGSVGElement> {
  insideClassName?: string;
  insideEvents?: {
    onClick?(e: MouseEvent): void;
    onMouseDown?(e: MouseEvent): void;
    onMouseMove?(e: MouseEvent): void;
  };
}
