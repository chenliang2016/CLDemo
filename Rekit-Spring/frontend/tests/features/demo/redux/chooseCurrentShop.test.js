import {
  DEMO_CHOOSE_CURRENT_SHOP,
} from '../../../../src/features/demo/redux/constants';

import {
  chooseCurrentShop,
  reducer,
} from '../../../../src/features/demo/redux/chooseCurrentShop';

describe('demo/redux/chooseCurrentShop', () => {
  it('returns correct action by chooseCurrentShop', () => {
    expect(chooseCurrentShop()).toHaveProperty('type', DEMO_CHOOSE_CURRENT_SHOP);
  });

  it('handles action type DEMO_CHOOSE_CURRENT_SHOP correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: DEMO_CHOOSE_CURRENT_SHOP }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
