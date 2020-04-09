import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  DEMO_DELETE_SHOP_BEGIN,
  DEMO_DELETE_SHOP_SUCCESS,
  DEMO_DELETE_SHOP_FAILURE,
  DEMO_DELETE_SHOP_DISMISS_ERROR,
} from '../../../../src/features/demo/redux/constants';

import {
  deleteShop,
  dismissDeleteShopError,
  reducer,
} from '../../../../src/features/demo/redux/deleteShop';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('demo/redux/deleteShop', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when deleteShop succeeds', () => {
    const store = mockStore({});

    return store.dispatch(deleteShop())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', DEMO_DELETE_SHOP_BEGIN);
        expect(actions[1]).toHaveProperty('type', DEMO_DELETE_SHOP_SUCCESS);
      });
  });

  it('dispatches failure action when deleteShop fails', () => {
    const store = mockStore({});

    return store.dispatch(deleteShop({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', DEMO_DELETE_SHOP_BEGIN);
        expect(actions[1]).toHaveProperty('type', DEMO_DELETE_SHOP_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDeleteShopError', () => {
    const expectedAction = {
      type: DEMO_DELETE_SHOP_DISMISS_ERROR,
    };
    expect(dismissDeleteShopError()).toEqual(expectedAction);
  });

  it('handles action type DEMO_DELETE_SHOP_BEGIN correctly', () => {
    const prevState = { deleteShopPending: false };
    const state = reducer(
      prevState,
      { type: DEMO_DELETE_SHOP_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteShopPending).toBe(true);
  });

  it('handles action type DEMO_DELETE_SHOP_SUCCESS correctly', () => {
    const prevState = { deleteShopPending: true };
    const state = reducer(
      prevState,
      { type: DEMO_DELETE_SHOP_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteShopPending).toBe(false);
  });

  it('handles action type DEMO_DELETE_SHOP_FAILURE correctly', () => {
    const prevState = { deleteShopPending: true };
    const state = reducer(
      prevState,
      { type: DEMO_DELETE_SHOP_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteShopPending).toBe(false);
    expect(state.deleteShopError).toEqual(expect.anything());
  });

  it('handles action type DEMO_DELETE_SHOP_DISMISS_ERROR correctly', () => {
    const prevState = { deleteShopError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: DEMO_DELETE_SHOP_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteShopError).toBe(null);
  });
});

