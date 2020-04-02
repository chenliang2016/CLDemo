import React from 'react';
import { shallow } from 'enzyme';
import { ShopModal } from '../../../src/features/demo';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<ShopModal />);
  expect(renderedComponent.find('.demo-shop-modal').length).toBe(1);
});
