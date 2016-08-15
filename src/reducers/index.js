import { combineReducers } from 'redux';

import PostsReducer from './postsReducer';
import AuthReducer from './authReducer';
import ErrorReducer from './errorReducer';

const rootReducer = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer,
  error: ErrorReducer,
});

export default rootReducer;
