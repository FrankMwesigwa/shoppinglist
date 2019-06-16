export const constants = {
  GET_ITEMS: 'GET_ITEMS',
  ADD_ITEMS: 'ADD_ITEMS',
  DELETE_ITEMS: 'DELETE_ITEMS'
};

export const getItems = () => {
  return {
    type: constants.GET_ITEMS
  };
};

export const deleteItem = id => {
  return {
    type: constants.DELETE_ITEMS,
    payload: id
  };
};
