import { LOAD_PROFILE_SUCCESS, LOAD_PROFILE_FAIL } from '../actions/types';

const initialState = {
  is_employer: false,
  first_name: '',
  last_name: '',
  username: '',
  email: '',
  title: '',
  phone_number: '',
  website: '',
  bio: '',
};

const profile = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        is_employer: payload.user.is_employer,
        first_name: payload.user.first_name,
        last_name: payload.user.last_name,
        username: payload.user.username,
        email: payload.user.email,
        title: payload.profile.title,
        phone_number: payload.profile.phone_number,
        website: payload.profile.website,
        bio: payload.profile.bio,
      };
    case LOAD_PROFILE_FAIL:
      return {
        ...state,
        is_employer: false,
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        title: '',
        phone_number: '',
        website: '',
        bio: '',
      };
    default:
      return state;
  }
};
export default profile;
