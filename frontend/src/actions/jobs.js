import axios from 'axios';
import { LOAD_JOBS_SUCCESS, LOAD_JOBS_FAIL } from './types';

export const loadJobs = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.get(
      'http://localhost:8000/jobs/api/jobs/',
      config
    );
    if (res.data.error) {
      dispatch({
        type: LOAD_JOBS_FAIL,
      });
    } else {
      dispatch({
        type: LOAD_JOBS_SUCCESS,
        payload: res.data.jobs,
      });
    }
  } catch (err) {
    dispatch({
      type: LOAD_JOBS_FAIL,
    });
  }
};
