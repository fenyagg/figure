import React from 'react';
import { render } from 'enzyme';
import Canvas from 'components/Editor/Canvas/Canvas';

it('snap', () => {
  const component = render(<Canvas />);
  expect(component).toMatchSnapshot();
});
