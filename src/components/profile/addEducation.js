import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addEducation } from '../../store/profile/actions';

class AddEducation extends Component {
  static propTypes = {
    addEducation: PropTypes.func.isRequired
  };
  state = {
    school: '',
    degree: '',
    from: '',
    to: '',
    current: false,
    description: '',
    disabled: false
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onCheck = e => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.addEducation(this.state, this.props.history);
  };

  render() {
    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you have attended
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <div class="form-group">
                  <input
                    placeholder="* School"
                    name="school"
                    value={this.state.school}
                    onChange={this.onChange}
                  />
                </div>
                <div class="form-group">
                  <input
                    placeholder="* Degree or Certification"
                    name="degree"
                    value={this.state.degree}
                    onChange={this.onChange}
                  />
                </div>
                <h6>From Date</h6>
                <div class="form-group">
                  <input name="from" type="date" value={this.state.from} onChange={this.onChange} />
                </div>
                <h6>To Date</h6>
                <div class="form-group">
                  <input
                    name="to"
                    type="date"
                    value={this.state.to}
                    onChange={this.onChange}
                    disabled={this.state.disabled ? 'disabled' : ''}
                  />
                </div>
                <div className="form-check mb-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    id="current"
                  />
                </div>
                <label htmlFor="current" className="form-check-label">
                  Current Job
                </label>
                <div className="form-check mb-4">
                  <textarea
                    placeholder="Job Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    info="Tell us about the the position"
                  />
                </div>
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addEducation }
)(withRouter(AddEducation));
