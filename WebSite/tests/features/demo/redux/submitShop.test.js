import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  DEMO_SUBMIT_SHOP_BEGIN,
  DEMO_SUBMIT_SHOP_SUCCESS,
  DEMO_SUBMIT_SHOP_FAILURE,
  DEMO_SUBMIT_SHOP_DISMISS_ERROR,
} from '../../../../src/features/demo/redux/constants';

import {
  submitShop,
  dismissSubmitShopError,
  reducer,
} from '../../../../src/features/demo/redux/submitShop';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('demo/redux/submitShop', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when submitShop succeeds', () => {
    const store = mockStore({});

    return store.dispatch(submitShop())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', DEMO_SUBMIT_SHOP_BEGIN);
        expect(actions[1]).toHaveProperty('type', DEMO_SUBMIT_SHOP_SUCCESS);
      });
  });

  it('dispatches failure action when submitShop fails', () => {
    const store = mockStore({});

    return store.dispatch(submitShop({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', DEMO_SUBMIT_SHOP_BEGIN);
        expect(actions[1]).toHaveProperty('type', DEMO_SUBMIT_SHOP_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSubmitShopError', () => {
    const expectedAction = {
      type: DEMO_SUBMIT_SHOP_DISMISS_ERROR,
    };
    expect(dismissSubmitShopError()).toEqual(expectedAction);
  });

  it('handles action type DEMO_SUBMIT_SHOP_BEGIN correctly', () => {
    const prevState = { submitShopPending: false };
    const state = reducer(
      prevState,
      { type: DEMO_SUBMIT_SHOP_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.submitShopPending).toBe(true);
  });

  it('handles action type DEMO_SUBMIT_SHOP_SUCCESS correctly', () => {
    const prevState = { submitShopPending: true };
    const state = reducer(
      prevState,
      { type: DEMO_SUBMIT_SHOP_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.submitShopPending).toBe(false);
  });

  it('handles action type DEMO_SUBMIT_SHOP_FAILURE correctly', () => {
    const prevState = { submitShopPending: true };
    const state = reducer(
      prevState,
      { type: DEMO_SUBMIT_SHOP_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.submitShopPending).toBe(false);
    expect(state.submitShopError).toEqual(expect.anything());
  });

  it('handles action type DEMO_SUBMIT_SHOP_DISMISS_ERROR correctly', () => {
    const prevState = { submitShopError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: DEMO_SUBMIT_SHOP_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.submitShopError).toBe(null);
  });
});

