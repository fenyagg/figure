import React from 'react';
import { render } from 'enzyme';
import Editor from './Editor';

it('snap', () => {
  const component = render(<Editor />);
  expect(component).toMatchSnapshot();
});
