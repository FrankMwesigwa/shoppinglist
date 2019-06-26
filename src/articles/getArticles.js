import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getArticles } from './actions';

class ArticleList extends Component {
  componentDidMount() {
    this.props.getArticles();
  }
  render() {
    const { articles, isLoading } = this.props;
    return (
      <div>
        {!articles && isLoading && <p>Loading articles....</p>}
        {articles.length <= 0 && !isLoading && (
          <p>No Articles Available. Add Articles to List here.</p>
        )}

        {articles && articles.length > 0 && !isLoading && (
          <table className="table booksTable">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Place</th>
                <th className="textCenter">Edit</th>
                <th className="textCenter">Delete</th>
                <th className="textCenter">View</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, i) => (
                <tr key={i}>
                  <td>{article.title}</td>
                  <td>{article.description}</td>
                  <td>{article.place}</td>
                  <td className="textCenter">
                    <button bsStyle="info" bsSize="xsmall">
                      Edit
                    </button>
                  </td>
                  <td className="textCenter">
                    <button bsStyle="danger" bsSize="xsmall">
                      Delete
                    </button>
                  </td>
                  <td className="textCenter">
                    <Link to={`/articles/${article._id}`}>View Details</Link>{' '}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.article.articles,
  isLoading: state.article.isLoading
});

export default connect(
  mapStateToProps,
  { getArticles }
)(ArticleList);
