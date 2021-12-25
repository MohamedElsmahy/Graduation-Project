import {
  EMP_NOTIFICATIONS_SUCCESS,
  EMP_NOTIFICATIONS_FAIL,
} from "../actions/types";

const initialState = {
  notifications: [],
};

const empNotifications = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case EMP_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: payload,
      };
    case EMP_NOTIFICATIONS_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default empNotifications;
