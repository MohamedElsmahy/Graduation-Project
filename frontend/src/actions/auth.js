import axios from 'axios';
import Cookies from 'js-cookie';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from './types';

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      'http://localhost:8000/accounts/login/',
      body,
      config
    );
    if (res.data.success) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.email,
      });
      // load user
    } else {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
    },
  };

  const body = JSON.stringify({
    withCredentials: true,
  });

  try {
    const res = await axios.post(
      'http://localhost:8000/accounts/logout/',
      body,
      config
    );
    if (res.data.success) {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: LOGOUT_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL,
    });
  }
};

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
