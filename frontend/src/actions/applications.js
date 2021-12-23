import axios from "axios";
import { APPLY_JOB_SUCCESS, APPLY_JOB_FAIL } from "./types";


 const loadEmployeeApplications = () => async (dispatch) => {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
  
    try {
      const res = await axios.get("http://localhost:8000/jobs/api/employee_applications/", config);
      dispatch({
        type: APPLY_JOB_SUCCESS,
        
      });
      return res.data
      console.log(res.data)
    } catch (err) {
      dispatch({
        type: APPLY_JOB_FAIL,
      });
    }
  };
export default loadEmployeeApplications;