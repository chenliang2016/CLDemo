import {
  DEMO_DELETE_SHOP_BEGIN,
  DEMO_DELETE_SHOP_SUCCESS,
  DEMO_DELETE_SHOP_FAILURE,
  DEMO_DELETE_SHOP_DISMISS_ERROR,
} from './constants';

import '../../../mock/shop'
import request from '../../../utils/request'
// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function deleteShop(id) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DEMO_DELETE_SHOP_BEGIN,
    });

   const promise = new Promise((resolve, reject) => {
        request({
          method:'get',
          url:'/v1/b/shop/delete',
          data:{id:id}
        }).then( data => {
            dispatch({
                type: DEMO_DELETE_SHOP_SUCCESS,
            });
            resolve(data);
        }).catch (error => {
            dispatch({
              type: DEMO_DELETE_SHOP_FAILURE,
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
export function dismissDeleteShopError() {
  return {
    type: DEMO_DELETE_SHOP_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DEMO_DELETE_SHOP_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        deleteShopPending: true,
        deleteShopError: null,
      };

    case DEMO_DELETE_SHOP_SUCCESS:
      // The request is success
      return {
        ...state,
        deleteShopPending: false,
        deleteShopError: null,
      };

    case DEMO_DELETE_SHOP_FAILURE:
      // The request is failed
      return {
        ...state,
        deleteShopPending: false,
        deleteShopError: action.data.error,
      };

    case DEMO_DELETE_SHOP_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        deleteShopError: null,
      };

    default:
      return state;
  }
}
