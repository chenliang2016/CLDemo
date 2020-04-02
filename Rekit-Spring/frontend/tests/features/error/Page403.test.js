import React from 'react';
import { shallow } from 'enzyme';
import { Page403 } from '../../../src/features/error';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Page403 />);
  expect(renderedComponent.find('.error-page-403').length).toBe(1);
});
