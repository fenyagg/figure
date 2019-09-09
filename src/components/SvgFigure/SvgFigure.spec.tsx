import React from 'react';
import { render } from 'enzyme';
import { EFigureType } from 'stores/models/Canvas/canvas.types';
import SvgFigure from './SvgFigure';

Object.values(EFigureType).forEach(type => {
  it('snap', () => {
    const component = render(<SvgFigure type={type} />);
    expect(component).toMatchSnapshot();
  });
});
