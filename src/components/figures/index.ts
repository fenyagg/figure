import Circle from 'components/figures/Circle';
import Square from 'components/figures/Square';
import { ISVGProps } from 'components/figures/SVG';
import Triangle from 'components/figures/Triangle';
import React from 'react';

export const figuresList: {
  [key: string]: React.FC<ISVGProps>;
} = {
  square: Square,
  triangle: Triangle,
  circle: Circle,
};
