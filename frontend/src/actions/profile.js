import axios from 'axios';
import Cookies from 'js-cookie';
import { LOAD_PROFILE_SUCCESS, LOAD_PROFILE_FAIL } from './types';

export const loadProfile = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.get(
      'http://localhost:8000/accounts/profile/',
      config
    );
    if (res.data.error) {
      dispatch({
        type: LOAD_PROFILE_FAIL,
      });
    } else {
      dispatch({
        type: LOAD_PROFILE_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: LOAD_PROFILE_FAIL,
    });
  }
};
