import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import GetArticles from './articles/getArticles';
import PostArticle from './articles/postArticle';
import ArticleDetails from './articles/articlesDetails';
import EditArticle from './articles/editArticle';

import NavBar from './components/layout/navbar';
import Landing from './components/layout/landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';

import DashBoard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile/createProfile';
import EditProfile from './components/profile/editProfile';

import setAuthToken from './helpers/setAuthToken';
import PrivateRoute from './helpers/PrivateRoute';
import { loadUser } from './store/auth/actions';
import store from './store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser);
  }, []);

  return (
    <BrowserRouter>
      <Fragment>
        <Route exact path="/articles" component={GetArticles} />
        <Route exact path="/articles/post" component={PostArticle} />
        <Route exact path="/articles/:id" component={ArticleDetails} />
        <Route exact path="/articles/:id/edit" component={EditArticle} />
        {/*<NavBar /> */}
        <Route exact path="/" component={Landing} />

        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/dashboard" component={DashBoard} />
            <PrivateRoute exact path="/createProfile" component={CreateProfile} />
            <PrivateRoute exact path="/editProfile" component={EditProfile} />
          </Switch>
        </section>
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
