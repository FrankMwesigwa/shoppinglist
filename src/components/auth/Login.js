import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../store/auth/actions';

const Login = props => {
  const [formData, setformData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const onChangeHandler = e => setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitHandler = async e => {
    e.preventDefault();
    props.login(email, password);
  };

  if (props.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Login</h1>
      <p className="lead">
        <i className="fas fa-user" /> Signin into Your Account
      </p>
      <form className="form" onSubmit={e => onSubmitHandler(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
            value={email}
            onChange={e => onChangeHandler(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChangeHandler(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account yet? <Link to="/register">Register</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
