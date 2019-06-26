import { constants } from './actions';

const initialState = {
  articles: [],
  article: {}
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_ARTICLES:
      return action.articles;
    case constants.ADD_ARTICLE:
      return [...state, action.payload];
    case constants.GET_ARTICLE:
      return action.article;
    case constants.DELETE_ARTICLE:
      return state.filter(article => article.id !== action.payload.id);
    case constants.UPDATE_ARTICLE:
      return {
        id: action.id,
        title: action.payload.title,
        content: action.payload.content
      };
    default:
      return state;
  }
};

export default articlesReducer;
