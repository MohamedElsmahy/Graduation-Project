import { LOAD_POST_SUCCESS, LOAD_POST_FAIL } from '../actions/types';

const initialState = {
  post: {},
  comments: [],
  likes: [],
};

const post = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_POST_SUCCESS:
      return {
        ...state,
        post: payload.post,
        comments: payload.comments,
        likes: payload.likes,
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
