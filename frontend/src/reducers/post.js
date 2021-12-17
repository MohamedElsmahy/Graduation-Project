import { LOAD_POST_SUCCESS, LOAD_POST_FAIL } from '../actions/types';

const initialState = {
  post: {},
};

const post = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_POST_SUCCESS:
      return {
        ...state,
        post: payload,
      };
    case LOAD_POST_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default post;
