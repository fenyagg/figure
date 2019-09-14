import React from 'react';
import { EFigureType } from 'stores/models/Canvas/canvas.types';
import Circle from '../svg/Circle';
import Square from '../svg/Square';
import Triangle from '../svg/Triangle';
import { ISvgFigureProps } from '../svg/ISvgFigureProps';

export const figuresMap = {
  [EFigureType.SQUARE]: Square,
  [EFigureType.TRIANGLE]: Triangle,
  [EFigureType.CIRCLE]: Circle,
};

interface IProps extends ISvgFigureProps {
  type: EFigureType;
}

const SvgFigure: React.FC<IProps> = ({ type, ...svgProps }) => {
  const SvgFigureItem = figuresMap[type];
  return SvgFigureItem ? <SvgFigureItem {...svgProps} /> : null;
};

export default SvgFigure;
