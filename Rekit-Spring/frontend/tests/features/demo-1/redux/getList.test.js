import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  DEMO_1_GET_LIST_BEGIN,
  DEMO_1_GET_LIST_SUCCESS,
  DEMO_1_GET_LIST_FAILURE,
  DEMO_1_GET_LIST_DISMISS_ERROR,
} from '../../../../src/features/demo-1/redux/constants';

import {
  getList,
  dismissGetListError,
  reducer,
} from '../../../../src/features/demo-1/redux/getList';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('demo-1/redux/getList', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getList succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getList())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', DEMO_1_GET_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', DEMO_1_GET_LIST_SUCCESS);
      });
  });

  it('dispatches failure action when getList fails', () => {
    const store = mockStore({});

    return store.dispatch(getList({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', DEMO_1_GET_LIST_BEGIN);
        expect(actions[1]).toHaveProperty('type', DEMO_1_GET_LIST_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetListError', () => {
    const expectedAction = {
      type: DEMO_1_GET_LIST_DISMISS_ERROR,
    };
    expect(dismissGetListError()).toEqual(expectedAction);
  });

  it('handles action type DEMO_1_GET_LIST_BEGIN correctly', () => {
    const prevState = { getListPending: false };
    const state = reducer(
      prevState,
      { type: DEMO_1_GET_LIST_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getListPending).toBe(true);
  });

  it('handles action type DEMO_1_GET_LIST_SUCCESS correctly', () => {
    const prevState = { getListPending: true };
    const state = reducer(
      prevState,
      { type: DEMO_1_GET_LIST_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getListPending).toBe(false);
  });

  it('handles action type DEMO_1_GET_LIST_FAILURE correctly', () => {
    const prevState = { getListPending: true };
    const state = reducer(
      prevState,
      { type: DEMO_1_GET_LIST_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getListPending).toBe(false);
    expect(state.getListError).toEqual(expect.anything());
  });

  it('handles action type DEMO_1_GET_LIST_DISMISS_ERROR correctly', () => {
    const prevState = { getListError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: DEMO_1_GET_LIST_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getListError).toBe(null);
  });
});

