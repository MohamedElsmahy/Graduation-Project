import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from '../actions/types';

const initialState = {
  isAthenticated: null,
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  is_employer: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAthenticated: true,
        email: payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAthenticated: false,
        email: '',
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_FAIL:
      return state;
    default:
      return state;
  }
}
