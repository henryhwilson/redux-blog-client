import { ActionTypes } from '../actions';

const error = {
  authError: false,
};

const ErrorReducer = (state = { error }, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_ERROR:
      return Object.assign({}, state.error, { authError: true, message: action.message });
    default:
      return Object.assign({}, state.error, error);
  }
};

export default ErrorReducer;
