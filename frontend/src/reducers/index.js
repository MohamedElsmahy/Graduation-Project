import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import posts from './posts';

const rootReducer = combineReducers({
  auth: auth,
  profile: profile,
  posts: posts,
});

export default rootReducer;
