import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/demo-1/DefaultPage';

describe('demo-1/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      demo1: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.demo-1-default-page').length
    ).toBe(1);
  });
});
