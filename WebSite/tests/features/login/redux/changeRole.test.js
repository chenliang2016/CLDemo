import {
  LOGIN_CHANGE_ROLE,
} from '../../../../src/features/login/redux/constants';

import {
  changeRole,
  reducer,
} from '../../../../src/features/login/redux/changeRole';

describe('login/redux/changeRole', () => {
  it('returns correct action by changeRole', () => {
    expect(changeRole()).toHaveProperty('type', LOGIN_CHANGE_ROLE);
  });

  it('handles action type LOGIN_CHANGE_ROLE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: LOGIN_CHANGE_ROLE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
