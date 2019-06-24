import axios from 'axios';
import { setAlert } from '../alerts/actions';

export const constants = {
  GET_PROFILE: 'GET_PROFILE',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  GET_PROFILES: 'GET_PROFILES',
  PROFILE_ERROR: 'PROFILE_ERROR'
};

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/profile/me');
    dispatch({ type: constants.GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({ type: constants.PROFILE_ERROR });
  }
};

export const addProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: { 'content-type': 'application/json' }
    };
    const res = await axios.post('/profile', formData, config);
    dispatch({ type: constants.GET_PROFILE, payload: res.data });
    dispatch(
      setAlert(edit ? 'Profile Updated Successfully' : 'Profile Created Succesfully', 'success')
    );

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: constants.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: { 'content-type': 'application/json' }
    };
    const res = await axios.post('/profile/experience', formData, config);
    dispatch({ type: constants.UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Profile Updated Successfully', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: constants.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: { 'content-type': 'application/json' }
    };
    const res = await axios.post('/profile/education', formData, config);
    dispatch({ type: constants.UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert('Profile Updated Successfully', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: constants.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
