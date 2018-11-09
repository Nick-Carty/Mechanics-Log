import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { push } from 'react-router'
import { browserHistory } from 'react-router'

class CarsEditFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      year: '',
      make: '',
      model: '',
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateYearEdit = this.validateYearEdit.bind(this);
    this.validateMakeEdit = this.validateMakeEdit.bind(this);
    this.validateModelEdit = this.validateModelEdit.bind(this);
  }

  componentDidMount() {
    fetch(`/api/v1/cars/${this.props.params.car_id}`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`
        error = new Error(message);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      let fetchedCar = body
      this.setState({
        id: fetchedCar.id,
        year: fetchedCar.year,
        make: fetchedCar.make,
        model: fetchedCar.model
       })

    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  validateYearEdit(input) {
    if (input === ''|| input.toString().length !== 4) {
      let newError = { title: "You must enter a Valid Year!" }
      this.setState({ errors: Object.assign({}, this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.inputError
      this.setState({ errors: errorState })
      return true
    }
  }

  validateMakeEdit(input) {
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

  validateModelEdit(input) {
    if (input.trim() === '') {
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
      (this.validateYearEdit(this.state.year)) &&
      (this.validateMakeEdit(this.state.make)) &&
      (this.validateModelEdit(this.state.model))
    ) {

    let formPayload = {
      year: this.state.year,
      make: this.state.make,
      model: this.state.model
    }
    fetch(`/api/v1/cars/${this.state.id}`, {
      method: 'PATCH',
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
        <h1 className="login-box-title">Edit Car Information</h1>
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

export default CarsEditFormContainer;
