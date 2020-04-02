import React from 'react';
import { shallow } from 'enzyme';
import { DemoList } from '../../../src/features/demo-1';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DemoList />);
  expect(renderedComponent.find('.demo-1-demo-list').length).toBe(1);
});
