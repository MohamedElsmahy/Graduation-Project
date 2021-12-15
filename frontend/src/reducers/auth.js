import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";

const initialState = {
  isAthenticated: null,
  first_name: "",
  last_name: "",
  username: "",
  email: "",
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
    case REGISTER_FAIL:
      return state;
    default:
      return state;
  }
}
