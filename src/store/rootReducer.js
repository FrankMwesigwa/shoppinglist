import { combineReducers } from 'redux';
import alert from './alerts/reducer';
import auth from './auth/reducer';

export default combineReducers({
  alert,
  auth
});
