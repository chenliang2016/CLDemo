import React from 'react';
import { shallow } from 'enzyme';
import { DemoPage } from '../../../src/features/demo-1/DemoPage';

describe('demo-1/DemoPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      demo1: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DemoPage {...props} />
    );

    expect(
      renderedComponent.find('.demo-1-demo-page').length
    ).toBe(1);
  });
});
