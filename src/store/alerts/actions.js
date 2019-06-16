import uuid from 'uuid';

export const constants = {
  SET_ALERT: 'SET_ALERT',
  REMOVE_ALERT: 'REMOVE_ALERT'
};

export const setAlert = (msg, alertType) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: constants.SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: constants.REMOVE_ALERT, payload: id }), 3000);
};
