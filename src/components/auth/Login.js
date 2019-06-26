import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../store/auth/actions';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

  onSubmitHandler = async e => {
    e.preventDefault();
    this.props.login(this.state);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  };

  render() {
    const { email, password } = this.state;

    return (
      <Fragment>
        <h1 className="large text-primary">Login</h1>
        <p className="lead">
          <i className="fas fa-user" /> Signin into Your Account
        </p>
        <form className="form" onSubmit={this.onSubmitHandler}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={this.onChangeHandler}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.onChangeHandler}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account yet? <Link to="/register">Register</Link>
        </p>
      </Fragment>
    );
  }
}

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
