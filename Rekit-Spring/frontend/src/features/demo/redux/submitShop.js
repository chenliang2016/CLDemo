import {
  DEMO_SUBMIT_SHOP_BEGIN,
  DEMO_SUBMIT_SHOP_SUCCESS,
  DEMO_SUBMIT_SHOP_FAILURE,
  DEMO_SUBMIT_SHOP_DISMISS_ERROR,
} from './constants';

import '../../../mock/shop'
import request from '../../../utils/request'

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function submitShop(params) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DEMO_SUBMIT_SHOP_BEGIN,
    });

    let apiurl = '/v1/b/shop/add';

    console.log(params);
    
    if (params.id != undefined){
      apiurl = '/v1/b/shop/update';
    }

    const promise = new Promise((resolve, reject) => {
        request({
          method:'get',
          url:apiurl,
          data: params,
        }).then( data => {
            dispatch({
                type: DEMO_SUBMIT_SHOP_SUCCESS,
                data: data,
            });
            resolve(data);
        }).catch (error => {
            dispatch({
              type: DEMO_SUBMIT_SHOP_FAILURE,
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
export function dismissSubmitShopError() {
  return {
    type: DEMO_SUBMIT_SHOP_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DEMO_SUBMIT_SHOP_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        submitShopPending: true,
        submitShopError: null,
      };

    case DEMO_SUBMIT_SHOP_SUCCESS:
      // The request is success
      return {
        ...state,
        submitShopPending: false,
        submitShopError: null,
      };

    case DEMO_SUBMIT_SHOP_FAILURE:
      // The request is failed
      return {
        ...state,
        submitShopPending: false,
        submitShopError: action.data.error,
      };

    case DEMO_SUBMIT_SHOP_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        submitShopError: null,
      };

    default:
      return state;
  }
}
