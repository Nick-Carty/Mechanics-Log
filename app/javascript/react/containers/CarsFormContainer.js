import React, { Component } from 'react';
import { Route, Redirect, IndexRoute, Router, browserHistory } from 'react-router';
import { validate } from '../lib/validators';
import { Link } from 'react-router';
import { push } from 'react-router';

class CarsFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '',
      make: '',
      model: '',
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let value = event.target.value
    let name = event.target.name
    this.setState({ [name]: value })
  }

  handleSubmit(event) {
    event.preventDefault();
    if (
      validate(this.state.year, 'year', this) &&
      validate(this.state.make, 'make', this) &&
      validate(this.state.model, 'model', this)
    ) {

    let formPayload = {
      year: this.state.year,
      make: this.state.make,
      model: this.state.model
    }
    fetch(`/api/v1/users/${window.currentUser.id}/cars`, {
      method: 'POST',
      body: JSON.stringify(formPayload),
      headers: {
        'Accept':  'application/json',
        'Content-Type': 'application/json'},
      credentials: 'same-origin'
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      browserHistory.push(`/`)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  render() {
    let errorDiv;
    let errorItems;

    if(Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className='error'>{errorItems}</div>
    }


    return(
      <div className="login-box">
        <h1 className="login-box-title"> Add a Car</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
          {errorDiv}
          <label>Year</label>
          <div>
            <input
              name='year'
              type= 'text'
              value={this.state.year}
              onChange={this.handleChange}
            />
          </div>
          <label>Make</label>
          <div className="field">
            <input
              label='Make'
              name='make'
              type = 'text'
              value={this.state.make}
              onChange={this.handleChange}
            />
          </div>
          <label>Model</label>
          <div className="field" placeholder="First Name">
            <input
              label='Model'
              type = 'text'
              name='model'
              value={this.state.model}
              onChange={this.handleChange}
            />
          </div>
          <input className="login-box-submit-button" type="submit" value="Submit" />
          </form>
        </div>
        <a onClick={browserHistory.goBack}>Back</a>
      </div>
    )
  }
};

export default CarsFormContainer;
