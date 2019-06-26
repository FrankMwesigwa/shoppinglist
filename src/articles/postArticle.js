import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addArticle } from './actions';

class postArticle extends Component {
  static propTypes = {
    addArticle: PropTypes.func.isRequired
  };

  state = { title: '', content: '' };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addArticle(this.state, this.props.history);
  };

  render() {
    return (
      <div>
        <h4>Add Article</h4>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              required
              value={this.state.title}
              onChange={this.handleChange}
              className="form-control"
              placeholder="Title"
            />
          </div>
          <div className="form-group">
            <textarea
              name="content"
              rows="5"
              required
              value={this.state.content}
              onChange={this.handleChange}
              className="form-control"
              placeholder="Content"
            />
          </div>
          <button type="submit" className="btn btn-dark">
            Create
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addArticle }
)(withRouter(postArticle));
