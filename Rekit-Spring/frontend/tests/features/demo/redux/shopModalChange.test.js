import {
  DEMO_SHOP_MODAL_CHANGE,
} from '../../../../src/features/demo/redux/constants';

import {
  shopModalChange,
  reducer,
} from '../../../../src/features/demo/redux/shopModalChange';

describe('demo/redux/shopModalChange', () => {
  it('returns correct action by shopModalChange', () => {
    expect(shopModalChange()).toHaveProperty('type', DEMO_SHOP_MODAL_CHANGE);
  });

  it('handles action type DEMO_SHOP_MODAL_CHANGE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DEMO_SHOP_MODAL_CHANGE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
