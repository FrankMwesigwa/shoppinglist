import axios from 'axios';
import { setAlert } from '../alerts/actions';

export const constants = {
  GET_PROFILE: 'GET_PROFILE',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  GET_PROFILES: 'GET_PROFILES',
  PROFILE_ERROR: 'PROFILE_ERROR',
  ACCOUNT_DELETED: 'ACCOUNT_DELETED',
  CLEAR_PROFILE: 'CLEAR_PROFILE'
};

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/profile/me');
    dispatch({ type: constants.GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({ type: constants.PROFILE_ERROR });
  }
};

export const getProfiles = () => async dispatch => {
  dispatch({ type: constants.CLEAR_PROFILE });
  try {
    const res = await axios.get('/profiles');
    dispatch({ type: constants.GET_PROFILES, payload: res.data });
  } catch (err) {
    dispatch({ type: constants.PROFILE_ERROR });
  }
};

export const getProfileById = userId => async dispatch => {
  try {
    const res = await axios.get(`/profiles/${userId}`);
    dispatch({ type: constants.GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({ type: constants.PROFILE_ERROR });
  }
};

export const addProfile = (formData, history, edit = false) => async dispatch => {
  try {
    const res = await axios.post('/profile', formData);
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
    dispatch({ type: constants.PROFILE_ERROR });
  }
};

export const addExperience = (experience, history) => async dispatch => {
  try {
    const res = await axios.put('/profile/experience', experience);
    dispatch({ type: constants.UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert(res.data.msg, 'success'));
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: constants.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addEducation = (education, history) => async dispatch => {
  try {
    const res = await axios.put('/profile/education', education);
    dispatch({ type: constants.UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert(res.data.msg, 'success'));
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: constants.PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/profile/education/${id}`);
    dispatch({ type: constants.UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert(res.data.msg, 'success'));
  } catch (err) {
    dispatch({
      type: constants.PROFILE_ERROR
    });
  }
};

export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/profile/experience/${id}`);
    dispatch({ type: constants.UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert(res.data.msg, 'success'));
  } catch (err) {
    dispatch({
      type: constants.PROFILE_ERROR
    });
  }
};

export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      const res = await axios.delete('/profile/');
      dispatch({ type: constants.CLEAR_PROFILE });
      dispatch(setAlert('Your Account has been permentantely Deleted', 'success'));
    } catch (err) {
      dispatch({
        type: constants.PROFILE_ERROR
      });
    }
  }
};
