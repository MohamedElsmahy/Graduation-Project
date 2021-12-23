import axios from "axios";
import {
  LOAD_JOBS_SUCCESS,
  LOAD_JOBS_FAIL,
  LOAD_JOB_SUCCESS,
  LOAD_JOB_FAIL,
  ADD_JOB_SUCCESS,
  ADD_JOB_FAIL,
  JOB_APPLICATION_SUCCESS,
  JOB_APPLICATION_FAIL,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_FAIL,
} from "./types";
import Cookies from "js-cookie";

export const AddNewJob =
  (
    owner,
    username,
    first_name,
    last_name,
    title,
    job_type,
    description,
    vacancy,
    salary,
    experience,
    category
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
      owner,
      username,
      first_name,
      last_name,
      title,
      job_type,
      description,
      vacancy,
      salary,
      experience,
      category,
      withCredentials: true,
    });

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/jobs/api/jobs/",
        body,
        config
      );
      dispatch({
        type: ADD_JOB_SUCCESS,
      });
      return res;
    } catch (err) {
      dispatch({
        type: ADD_JOB_FAIL,
      });
    }
  };

export const UserApplyJob = (id) => async (dispatch) => {
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
      `http://localhost:8000/jobs/api/jobs/${id}/apply/`,
      body,
      config
    );
    if (res.data.error) {
      dispatch({
        type: JOB_APPLICATION_FAIL,
      });
    } else {
      dispatch({
        type: JOB_APPLICATION_SUCCESS,
      });
      return res.status;
    }
  } catch (err) {
    dispatch({
      type: JOB_APPLICATION_FAIL,
    });
  }
};

export const AnonApplyJob =
  (id, full_name, email, website, cv, cover_letter) => async (dispatch) => {
    const formData = new FormData();
    formData.append("full_name", full_name);
    formData.append("email", email);
    formData.append("website", website);
    formData.append("cv", cv);
    formData.append("cover_letter", cover_letter);

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    try {
      const res = await axios.post(
        `http://localhost:8000/jobs/api/jobs/${id}/apply/anonymous/`,
        formData,
        config
      );
      if (res.data.error) {
        dispatch({
          type: JOB_APPLICATION_FAIL,
        });
        return res.data;
      } else {
        dispatch({
          type: JOB_APPLICATION_SUCCESS,
        });
        return res.data;
      }
    } catch (err) {
      dispatch({
        type: JOB_APPLICATION_FAIL,
      });
    }
};

export const loadJobs = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get("http://localhost:8000/jobs/api/jobs/", config);
    dispatch({
      type: LOAD_JOBS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_JOBS_FAIL,
    });
  }
};

export const loadJob = (id) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    const jobRes = await axios.get(
      `http://localhost:8000/jobs/api/${id}`,
      config
    );
    dispatch({
      type: LOAD_JOB_SUCCESS,
      payload: {
        job: jobRes.data,
      },
    });
  } catch (err) {
    dispatch({
      type: LOAD_JOB_FAIL,
    });
  }
};

export const DeleteJob = (id) => async () => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": Cookies.get("csrftoken"),
    },
  };

  try {
    const res = await axios.delete(
      `http://localhost:8000/jobs/api/${id}`,
      config
    );
    return res.status;
  } catch (err) {}
};

export const loadCategories = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      "http://localhost:8000/jobs/api/category/",
      config
    );
    if (res.data.error) {
      dispatch({
        type: LOAD_CATEGORIES_FAIL,
      });
    } else {
      dispatch({
        type: LOAD_CATEGORIES_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: LOAD_CATEGORIES_FAIL,
    });
  }
};