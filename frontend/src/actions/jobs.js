import axios from 'axios';
import { LOAD_JOBS_SUCCESS, LOAD_JOBS_FAIL, LOAD_JOB_SUCCESS, LOAD_JOB_FAIL } from './types';
import Cookies from 'js-cookie';
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
export const loadJob = (id) => async (dispatch) =>{
  const config = {
    headers: {

      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  try{
    const jobRes = await axios.get(
      `http://localhost:8000/jobs/api/${id}`,
      config
    );
    dispatch({
      type : LOAD_JOB_SUCCESS,
      payload:{
        job: jobRes.data,
      },

    });
  }catch(err){
    dispatch({
      type: LOAD_JOB_FAIL
    });
  }

};

export const DeleteJob= (id) => async () => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': Cookies.get('csrftoken'),
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