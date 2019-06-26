import { constants } from './actions';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: true,
  user: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.REGISTER_SUCCESS:
    case constants.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case constants.REGISTER_FAIL:
    case constants.AUTH_ERROR:
    case constants.LOGIN_FAIL:
    case constants.LOGOUT_SUCCESS:
    case constants.ACCOUNT_DELETED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isLoading: false
      };
    case constants.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
