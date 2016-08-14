import { ActionTypes } from '../actions';

const auth = {
  authenticated: false,
};

const AuthReducer = (state = { auth }, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return Object.assign({}, state.auth, { authenticated: true });
    case ActionTypes.DEAUTH_USER:
      return Object.assign({}, state.auth, { authenticated: false });
    case ActionTypes.AUTH_ERROR:
      return Object.assign({}, state.auth, { authenticated: false });
    default:
      return state;
  }
};

export default AuthReducer;