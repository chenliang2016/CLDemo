// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  DEMO_CHOOSE_CURRENT_SHOP,
} from './constants';

export function chooseCurrentShop(shop) {
  return {
    type: DEMO_CHOOSE_CURRENT_SHOP,
    data: shop
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DEMO_CHOOSE_CURRENT_SHOP:
      return {
        ...state,
        currentShop:action.data,
      };

    default:
      return state;
  }
}
