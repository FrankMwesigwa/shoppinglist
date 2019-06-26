import { constants } from './actions';
import { constants as CLEAR_PROFILE } from '../auth/actions';

const initialState = {
  profile: {},
  profiles: [],
  isLoading: true,
  error: {}
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.PROFILE_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case constants.GET_PROFILE:
    case constants.UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        isLoading: false
      };
    case constants.PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case constants.GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        isLoading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        isLoading: false
      };
    default:
      return state;
  }
};

export default profileReducer;
