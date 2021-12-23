import axios from "axios";
import Cookies from "js-cookie";
import {
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAIL,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
} from "./types";

export const loadProfile = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      "http://localhost:8000/accounts/profile/",
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

export const updateProfile =
  (
    first_name,
    last_name,
    email,
    title,
    phone_number,
    website,
    bio,
    image,
    cv,
    location,
    user
  ) =>
  async (dispatch) => {
    const formData = new FormData();
    formData.append("first_name",first_name);
    formData.append("last_name",last_name);
    formData.append("email",email);
    formData.append("title",title);
    formData.append("phone_number",phone_number);
    formData.append("website",website);
    formData.append("bio",bio);
    formData.append("image",image);
    formData.append("cv",cv);
    formData.append("location",location);
    formData.append("user",user);

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    const body = JSON.stringify({
      'withCredentials': true,

      first_name,
      last_name,
      email,
      title,
      phone_number,
      website,
      bio,
      image,
      cv,
      location,
      user
    });
    try {
      const res = await axios.put(
        `http://localhost:8000/accounts/profile/update/`,
        formData,
        config
      );
      if (res.status==200){
        dispatch({
          type: UPDATE_PROFILE_SUCCESS,
          payload: res.data,
        }); 
      } else{
        dispatch({
          type: UPDATE_PROFILE_FAIL,
        });
      }
      
    } catch (err) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
      });
    }
};



