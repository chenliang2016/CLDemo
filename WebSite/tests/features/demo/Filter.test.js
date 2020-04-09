import React from 'react';
import { shallow } from 'enzyme';
import { Filter } from '../../../src/features/demo';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Filter />);
  expect(renderedComponent.find('.demo-filter').length).toBe(1);
});
