import axios from 'axios';
import Cookies from 'js-cookie';
import { LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL } from './types';

export const loadPosts = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.get(
      'http://localhost:8000/blog-api/posts/',
      config
    );
    if (res.data.error) {
      dispatch({
        type: LOAD_POSTS_FAIL,
      });
    } else {
      dispatch({
        type: LOAD_POSTS_SUCCESS,
        payload: res.data.posts,
      });
    }
  } catch (err) {
    dispatch({
      type: LOAD_POSTS_FAIL,
    });
  }
};
