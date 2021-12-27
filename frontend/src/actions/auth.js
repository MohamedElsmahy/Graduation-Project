import axios from "axios";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

import { loadProfile } from "./profile";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "./types";

export const checkAuth = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      "http://localhost:8000/accounts/authenticated/",
      config
    );
    if (res.data.error || res.data.isAuthenticated === "error") {
      dispatch({
        type: AUTHENTICATED_FAIL,
        payload: false,
      });
    } else if (res.data.isAuthenticated === "success") {
      dispatch({
        type: AUTHENTICATED_SUCCESS,
        payload: true,
      });
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL,
        payload: false,
      });
    }
  } catch (err) {}
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      "http://localhost:8000/accounts/login/",
      body,
      config
    );
    if (res.data.success) {
      dispatch({
        type: LOGIN_SUCCESS,
      });
      dispatch(loadProfile());
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
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    withCredentials: true,
  });

  try {
    const res = await axios.post(
      "http://localhost:8000/accounts/logout/",
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
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
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
        "http://localhost:8000/accounts/signup/",
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
const deleteAccount = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    'withCredentials': true,
  });

  try {
    const res = await axios.delete(
      "http://localhost:8000/accounts/delete/",
      body,
      config
    );
    if (res.data.success) {
      dispatch({
        type: DELETE_USER_SUCCESS,
      });
    } else {
      dispatch({
        type: DELETE_USER_FAIL,
      });
    }
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
    });
  }
};

export default deleteAccount;