import React from 'react';
import { render } from 'enzyme';
import Editor from '../components/Editor/Editor';

it('snap', () => {
  const component = render(<Editor />);
  expect(component).toMatchSnapshot();
});
