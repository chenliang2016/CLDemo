import React from 'react';
import { shallow } from 'enzyme';
import { Layout } from '../../../src/features/common/Layout';

describe('common/Layout', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Layout {...props} />
    );

    expect(
      renderedComponent.find('.common-layout').length
    ).toBe(1);
  });
});
