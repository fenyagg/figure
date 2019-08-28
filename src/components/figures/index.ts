import Circle from 'components/figures/Circle';
import Square from 'components/figures/Square';
import Triangle from 'components/figures/Triangle';
import React from 'react';

export const figuresList: {
  [key: string]: React.FC<React.SVGProps<SVGSVGElement>>;
} = {
  square: Square,
  triangle: Triangle,
  circle: Circle,
};
