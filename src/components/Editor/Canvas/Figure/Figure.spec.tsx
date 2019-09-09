import React from 'react';
import { render } from 'enzyme';
import { IFigure } from 'stores/models/Canvas/Canvas';
import { EFigureType } from 'stores/models/Canvas/canvas.types';
import Figure from './Figure';

it('snap', () => {
  const figureItem: IFigure = {
    id: 'test',
    type: EFigureType.CIRCLE,
    height: 0,
    width: 0,
    left: 0,
    top: 0,
  };
  const component = render(<Figure figure={figureItem} />);
  expect(component).toMatchSnapshot();
});
