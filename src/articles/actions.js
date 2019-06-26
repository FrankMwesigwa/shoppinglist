import axios from 'axios';
import { setAlert } from '../store/alerts/actions';

export const constants = {
  GET_ARTICLES: 'GET_ARTICLES',
  ADD_ARTICLE: 'ADD_ARTICLE',
  ARTICLE_ERROR: 'ARTICLE_ERROR',
  GET_ARTICLE: 'GET_ARTICLE',
  DELETE_ARTICLE: 'DELETE_ARTICLE',
  UPDATE_ARTICLE: 'UPDATE_ARTICLE',
  REPLACE_ARTICLE: 'REPLACE_ARTICLE'
};

export const getArticles = () => async dispatch => {
  try {
    const res = await axios.get('/articles');
    dispatch({ type: constants.GET_ARTICLES, articles: res.data });
  } catch (err) {
    dispatch({ type: constants.ARTICLE_ERROR });
  }
};

export const addArticle = (articlesData, history) => async dispatch => {
  try {
    const res = await axios.post('/articles/post', articlesData);
    dispatch({ type: constants.ADD_ARTICLE, payload: res.data });
    dispatch(setAlert('Article Created Successfully', 'success'));
    history.push('/articles');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      dispatch(setAlert(errors.msg, 'danger'));
    }
    dispatch({ type: constants.ARTICLE_ERROR });
  }
};

export const getArticle = id => async dispatch => {
  try {
    const res = await axios.get(`/articles/${id}`);
    dispatch({ type: constants.GET_ARTICLE, article: res.data });
  } catch (err) {
    dispatch({ type: constants.ARTICLE_ERROR });
  }
};

export const deleteArticle = (id, history) => async dispatch => {
  try {
    const res = await axios.get(`/articles/${id}`);
    dispatch({ type: constants.DELETE_ARTICLE, payload: res.data.id });
    dispatch(setAlert('Article Deleted Successfully', 'success'));
    history.push('/articles');
  } catch (err) {
    dispatch({ type: constants.ARTICLE_ERROR });
  }
};

export const updateArticle = (article, history) => dispatch => {
  const articleId = article.id;
  return axios
    .patch(`articles/${article.id}.json`, { title: article.title, content: article.content })
    .then(response => {
      const data = response.data;
      dispatch({
        type: constants.UPDATE_ARTICLE,
        payload: { id: data.id, title: data.title, content: data.content }
      });
      dispatch({
        type: constants.REPLACE_ARTICLE,
        payload: { id: data.id, title: data.title, content: data.content }
      });
    })
    .then(() => {
      history.push(`/articles/${articleId}`);
    })
    .catch(err => {
      dispatch({ type: constants.ARTICLE_ERROR, error: err.response.data });
    });
};
