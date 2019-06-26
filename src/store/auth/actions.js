import axios from 'axios';
import { setAlert } from '../alerts/actions';
import setAuthToken from '../../helpers/setAuthToken';

export const constants = {
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAIL: 'REGISTER_FAIL',
  USER_LOADED: 'USER_LOADED',
  AUTH_ERROR: 'AUTH_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAIL: 'LOGIN_FAIL',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
  CLEAR_PROFILE: 'CLEAR_PROFILE'
};

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/account/auth');
    dispatch({ type: constants.USER_LOADED, payload: res.data });
  } catch (error) {
    dispatch({ type: constants.AUTH_ERROR });
  }
};

export const register = userdata => async dispatch => {
  try {
    const res = await axios.post('/users/register', userdata);
    dispatch({ type: constants.REGISTER_SUCCESS, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: constants.REGISTER_FAIL });
  }
};

export const login = logindata => async dispatch => {
  try {
    const res = await axios.post('/account/login', logindata);
    dispatch({ type: constants.LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: constants.LOGIN_FAIL });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: constants.CLEAR_PROFILE });
  dispatch({ type: constants.LOGOUT_SUCCESS });
};
