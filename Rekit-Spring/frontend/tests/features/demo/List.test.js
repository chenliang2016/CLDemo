import React from 'react';
import { shallow } from 'enzyme';
import { List } from '../../../src/features/demo';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<List />);
  expect(renderedComponent.find('.demo-list').length).toBe(1);
});
