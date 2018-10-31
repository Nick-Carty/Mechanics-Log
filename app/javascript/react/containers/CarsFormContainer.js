import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { push } from 'react-router'
import { browserHistory } from 'react-router'

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
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateYearInput = this.validateYearInput.bind(this);
    this.validateMakeInput = this.validateMakeInput.bind(this);
    this.validateModelInput = this.validateModelInput.bind(this);
  }

  validateYearInput(input) {
      if (input.trim() === '') {
        let newError = { title: "You must enter a Year!" }
        this.setState({ errors: Object.assign({}, this.state.errors, newError) })
        return false
      } else {
        let errorState = this.state.errors
        delete errorState.inputError
        this.setState({ errors: errorState })
        return true
      }
    }

  validateMakeInput(input) {
      if (input.trim() === '') {
        let newError = { title: "You must enter a Make!" }
        this.setState({ errors: Object.assign({}, this.state.errors, newError) })
        return false
      } else {
        let errorState = this.state.errors
        delete errorState.inputError
        this.setState({ errors: errorState })
        return true
      }
    }

  validateModelInput(input) {
      if (input === '') {
        let newError = { title: "You must enter a Model!" }
        this.setState({ errors: Object.assign({}, this.state.errors, newError) })
        return false
      } else {
        let errorState = this.state.errors
        delete errorState.inputError
        this.setState({ errors: errorState })
        return true
      }
    }

  handleChange(event) {
    let value = event.target.value
    let name = event.target.name
    this.setState({ [name]: value })
  }

  handleClearForm() {
    this.setState({
      year: '',
      make: '',
      model: '',
      errors: {}
    })
  };

  handleSubmit(event) {
    event.preventDefault();
    if(
      (this.validateYearInput(this.state.year)) &&
      (this.validateMakeInput(this.state.make)) &&
      (this.validateModelInput(this.state.model))
    ) {

    let formPayload = {
      year: this.state.year,
      make: this.state.make,
      model: this.state.model
    }
    fetch(`/api/v1/current_user/${window.currentUser.id}/cars`, {
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
      <div>
        <h1> Add a Car</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
          {errorDiv}
          <label >Year</label>
          <div>
            <input
              name='year'
              type = 'text'
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
          <div className="field">
            <input
              label='Model'
              type = 'text'
              name='model'
              value={this.state.model}
              onChange={this.handleChange}
            />
          </div>

          <input className="button" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }
};

export default CarsFormContainer;
