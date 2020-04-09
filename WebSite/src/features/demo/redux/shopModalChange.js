// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  DEMO_SHOP_MODAL_CHANGE,
} from './constants';

export function shopModalChange(visible,type) {
  return {
    type: DEMO_SHOP_MODAL_CHANGE,
    data: {visible,type},
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DEMO_SHOP_MODAL_CHANGE:
      return {
        ...state,
        shopModalType:action.data.type,
        shopModalVisible:action.data.visible
      };

    default:
      return state;
  }
}
