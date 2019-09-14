import React, { MouseEvent } from 'react';

export interface ISvgFigureProps extends React.SVGProps<SVGSVGElement> {
  insideClassName?: string;
  onClickInside?(e: MouseEvent): void;
}
