import uuid from "uuid";
import { constants } from "./actions";

const initialState = {
  items: [
    { id: uuid(), name: "Kampala" },
    { id: uuid(), name: "Jinja" },
    { id: uuid(), name: "Masaka" },
    { id: uuid(), name: "Mbale" },
    { id: uuid(), name: "Kamwenge" }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case constants.GET_ITEMS:
      return {
        ...state
      };
    case constants.DELETE_ITEMS:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    default:
      return state;
  }
}
