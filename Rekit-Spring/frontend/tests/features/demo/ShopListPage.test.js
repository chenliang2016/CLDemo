import React from 'react';
import { shallow } from 'enzyme';
import { ShopListPage } from '../../../src/features/demo/ShopListPage';

describe('demo/ShopListPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      demo: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ShopListPage {...props} />
    );

    expect(
      renderedComponent.find('.demo-shop-list-page').length
    ).toBe(1);
  });
});
