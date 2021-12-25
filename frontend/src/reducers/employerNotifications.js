import {
    NOTIFICATIONS_SUCCESS,
    NOTIFICATIONS_FAIL,
  } from "../actions/types";
  
  const initialState = {
    employer_notifications: [],
  };
  
  const employerNotifications = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case NOTIFICATIONS_SUCCESS:
        return {
          ...state,
          employer_notifications: payload,
        };
      case NOTIFICATIONS_FAIL:
        return {
          ...state,
        };
      default:
        return state;
    }
  };
  export default employerNotifications;
  