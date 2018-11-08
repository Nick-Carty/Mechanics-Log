import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { push } from 'react-router'
import { browserHistory } from 'react-router'

class RepairsFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateTitleInput = this.validateTitleInput.bind(this);
    this.validateDescriptionInput = this.validateDescriptionInput.bind(this);
  }

  validateTitleInput(input) {
    if (input.trim() === '') {
      let newError = { title: "You must enter a Title!" }
      this.setState({ errors: Object.assign({}, this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.inputError
      this.setState({ errors: errorState })
      return true
    }
  }

  validateDescriptionInput(input) {
    if (input.trim() === '') {
      let newError = { title: "You must enter a Description!" }
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
      title: '',
      description: '',
      errors: {}
    })
  };

  handleSubmit(event) {
    event.preventDefault();
    if(
      (this.validateTitleInput(this.state.title)) &&
      (this.validateDescriptionInput(this.state.description))
    ) {

    let formPayload = {
      title: this.state.title,
      description: this.state.description
    }
    fetch(`/api/v1/cars/${this.props.params.car_id}/repairs`, {
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
      browserHistory.push(`/cars/${this.props.params.car_id}`)
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
        <h1 className="login-box-title"> Repair Information</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
          {errorDiv}
          <label>Title</label>
          <div>
            <input
              name='title'
              type= 'text'
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <label>Description</label>
          <div>
            <textarea
              className="area-field"
              label='Description'
              name='description'
              type = 'text'
              value={this.state.description}
              onChange={this.handleChange}
            />
          </div>
          <input className="login-box-submit-button" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }
};

export default RepairsFormContainer;
