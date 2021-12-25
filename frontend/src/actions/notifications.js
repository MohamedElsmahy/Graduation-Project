import axios from "axios";
import Cookies from "js-cookie";
import {
  EMP_NOTIFICATIONS_SUCCESS,
  EMP_NOTIFICATIONS_FAIL,
  UPDATE_EMP_NOTIF_SUCCESS,
  UPDATE_EMP_NOTIF_FAIL,
} from "./types";

export const SendNotifications = (to_user, is_read, job, created_by) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };
  let notifications_type = "application";
  const post_body = JSON.stringify({
    to_user,
    is_read,
    job,
    created_by,
    notifications_type,
  });
  const promise = axios.post(
    "http://localhost:8000/notifications/api/",
    post_body,
    config
  );
  const dataPromise = promise.then((res) => res.data);
  return dataPromise;
};

export const updateEmpNotification = (id) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  const body = JSON.stringify({
    is_read: true,
  });

  try {
    const res = await axios.patch(
      `http://localhost:8000/notifications/api/employee/notifications/${id}/update/`,
      body,
      config
    );
    if (res.status === 200) {
      dispatch({
        type: UPDATE_EMP_NOTIF_SUCCESS,
      });
    } else {
      dispatch({
        type: UPDATE_EMP_NOTIF_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: UPDATE_EMP_NOTIF_FAIL,
    });
  }
};

const loadEmployeeNotifications = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      "http://localhost:8000/notifications/api/employee/notifications/",
      config
    );
    dispatch({
      type: EMP_NOTIFICATIONS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EMP_NOTIFICATIONS_FAIL,
    });
  }
};

export default loadEmployeeNotifications;
