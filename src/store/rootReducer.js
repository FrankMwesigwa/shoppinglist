import { combineReducers } from 'redux';
import alert from './alerts/reducer';
import auth from './auth/reducer';
import profile from './profile/reducer';
import article from '../articles/reducer';

export default combineReducers({
  alert,
  auth,
  profile,
  article
});
