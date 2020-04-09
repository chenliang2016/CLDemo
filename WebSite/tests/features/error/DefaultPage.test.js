import React from 'react';
import { shallow } from 'enzyme';
import { DefaultPage } from '../../../src/features/error/DefaultPage';

describe('error/DefaultPage', () => {
  it('renders node with correct class name', () => {
    const props = {
      error: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DefaultPage {...props} />
    );

    expect(
      renderedComponent.find('.error-default-page').length
    ).toBe(1);
  });
});
