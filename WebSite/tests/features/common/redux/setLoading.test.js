import {
  COMMON_SET_LOADING,
} from '../../../../src/features/common/redux/constants';

import {
  setLoading,
  reducer,
} from '../../../../src/features/common/redux/setLoading';

describe('common/redux/setLoading', () => {
  it('returns correct action by setLoading', () => {
    expect(setLoading()).toHaveProperty('type', COMMON_SET_LOADING);
  });

  it('handles action type COMMON_SET_LOADING correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_SET_LOADING }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
