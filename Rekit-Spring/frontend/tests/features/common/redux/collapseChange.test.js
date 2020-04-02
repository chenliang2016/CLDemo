import {
  COMMON_COLLAPSE_CHANGE,
} from '../../../../src/features/common/redux/constants';

import {
  collapseChange,
  reducer,
} from '../../../../src/features/common/redux/collapseChange';

describe('common/redux/collapseChange', () => {
  it('returns correct action by collapseChange', () => {
    expect(collapseChange()).toHaveProperty('type', COMMON_COLLAPSE_CHANGE);
  });

  it('handles action type COMMON_COLLAPSE_CHANGE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_COLLAPSE_CHANGE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
