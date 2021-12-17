import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import posts from './posts';
import jobs from './jobs'
const rootReducer = combineReducers({
  auth: auth,
  profile: profile,
  posts: posts,
  jobs:jobs,
});

export default rootReducer;
