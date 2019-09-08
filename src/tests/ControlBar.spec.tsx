import React from 'react';
import { render } from 'enzyme';
import ControlBar from '../components/Editor/ControlBar/ControlBar';

it('snap', () => {
  const component = render(<ControlBar />);
  expect(component).toMatchSnapshot();
});
