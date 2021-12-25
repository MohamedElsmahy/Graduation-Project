import axios from "axios";
import { EMP_NOTIFICATIONS_SUCCESS, EMP_NOTIFICATIONS_FAIL , NOTIFICATIONS_SUCCESS , NOTIFICATIONS_FAIL } from "./types";

export const loadEmployerNotifications = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  
  try {
    const res = await axios.get(
    "http://localhost:8000/notifications/api/",
    config
  );
    dispatch({
      type: NOTIFICATIONS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: NOTIFICATIONS_FAIL,
    });
  }
};

export const loadEmployeeNotifications = () => async (dispatch) => {
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



