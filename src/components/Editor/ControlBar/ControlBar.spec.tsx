import React from 'react';
import { render } from 'enzyme';
import ControlBar from './ControlBar';

it('snap', () => {
  const component = render(<ControlBar />);
  expect(component).toMatchSnapshot();
});
