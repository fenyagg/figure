import React from 'react';
import { render } from 'enzyme';
import FigureFrame from './FigureFrame';

it('snap', () => {
  const component = render(<FigureFrame />);
  expect(component).toMatchSnapshot();
});
