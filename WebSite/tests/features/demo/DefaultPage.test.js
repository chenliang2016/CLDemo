import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/demo/DefaultPage';

describe('demo/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      demo: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.demo-default-page').length
    ).toBe(1);
  });
});
