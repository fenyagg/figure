import React from 'react';
import { EFigureType } from '../../stores/models/Canvas/canvas.types';
import Circle from './Circle';
import Square from './Square';
import Triangle from './Triangle';

export const figuresList: {
  [key: string]: React.FC<React.SVGProps<SVGSVGElement>>;
} = {
  [EFigureType.SQUARE]: Square,
  [EFigureType.TRIANGLE]: Triangle,
  [EFigureType.CIRCLE]: Circle,
};
