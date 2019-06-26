import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateArticle } from './actions';

class EditArticle extends Component {
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const id = this.props.article.id;
    const title = this.state.title ? this.state.title : this.props.article.title;
    const content = this.state.content ? this.state.content : this.props.article.content;
    const article = { id: id, title: title, content: content };
    this.props.updateArticle(article);
  };

  handleCancel = () => {
    this.props.history.push(`/articles/${this.props.article.id}`);
  };

  render() {
    return (
      <div>
        <h1>Edit {this.props.article.title}</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              defaultValue={this.props.article.title}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              name="content"
              rows="5"
              defaultValue={this.props.article.content}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="btn-group">
            <button type="submit" className="btn btn-dark">
              Update
            </button>
            <button type="button" onClick={this.handleCancel} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({ article: state.articles });

export default connect(
  mapStateToProps,
  { updateArticle }
)(EditArticle);
