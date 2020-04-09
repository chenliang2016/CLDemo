import {
  DEMO_GET_LIST_BEGIN,
  DEMO_GET_LIST_SUCCESS,
  DEMO_GET_LIST_FAILURE,
  DEMO_GET_LIST_DISMISS_ERROR,
} from './constants';

import '../../../mock/shop'
import request from '../../../utils/request'
// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function getList(page) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DEMO_GET_LIST_BEGIN,
    });

   const promise = new Promise((resolve, reject) => {
        request({
          method:'get',
          url:'/v1/b/shop/list',
        }).then( data => {
            dispatch({
                type: DEMO_GET_LIST_SUCCESS,
                data: data,
            });
            resolve(data);
        }).catch (error => {
            dispatch({
              type: DEMO_GET_LIST_FAILURE,
              data: { error: error },
            });
            reject(error);
        })
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGetListError() {
  return {
    type: DEMO_GET_LIST_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DEMO_GET_LIST_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getListPending: true,
        getListError: null,
      };

    case DEMO_GET_LIST_SUCCESS:
      // The request is success

      const byId = {};
      const items = [];
      action.data.shopList.forEach(item => {
        items.push(item.id);
        byId[item.id] = item;
      });
      return {
        ...state,
        byId:byId,
        list:items,
        page: action.data.page,
        size: action.data.size,
        total: action.data.total,
        getListPending: false,
        getListError: null,
      };

    case DEMO_GET_LIST_FAILURE:
      // The request is failed
      return {
        ...state,
        getListPending: false,
        getListError: action.data.error,
      };

    case DEMO_GET_LIST_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getListError: null,
      };

    default:
      return state;
  }
}
