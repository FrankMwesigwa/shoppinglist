import { constants } from './actions';

const initialState = [];

export default function(state = initialState, action) {
  switch (action.type) {
    case constants.SET_ALERT:
      return [...state, action.payload];
    case constants.REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
}
