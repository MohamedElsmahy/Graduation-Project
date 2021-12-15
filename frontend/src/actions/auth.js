import axios from 'axios';
import Cookies from 'js-cookie';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

export const register =
  (
    first_name,
    last_name,
    username,
    email,
    password,
    re_password,
    is_employer
  ) =>
  async (dispatch) => {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };
    const body = JSON.stringify({
      first_name,
      last_name,
      username,
      email,
      password,
      re_password,
      is_employer,
    });

    try {
      const res = await axios.post(
        'http://localhost:8000/accounts/signup/',
        body,
        config
      );
      if (res.data.error) {
        dispatch({
          type: REGISTER_FAIL,
        });
      } else {
        dispatch({
          type: REGISTER_SUCCESS,
        });
      }
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };
