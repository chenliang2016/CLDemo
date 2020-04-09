// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  COMMON_COLLAPSE_CHANGE,
} from './constants';

export function collapseChange() {
  return {
    type: COMMON_COLLAPSE_CHANGE,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_COLLAPSE_CHANGE:
      return {
        ...state,
        collapsed:!state.collapsed,
      };

    default:
      return state;
  }
}
