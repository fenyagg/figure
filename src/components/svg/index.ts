import Circle from './Circle';
import Square from './Square';
import Triangle from './Triangle';
import React from 'react';

export const figuresList: {
  [key: string]: React.FC<React.SVGProps<SVGSVGElement>>;
} = {
  square: Square,
  triangle: Triangle,
  circle: Circle,
};
