import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { validate } from '../lib/validators';
import { push } from 'react-router'
import { browserHistory } from 'react-router'

class RepairsEditFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      description: '',
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch(`/api/v1/repairs/${this.props.params.repair_id}`)
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
      let fetchedRepair = body.repair
      this.setState({
        id: fetchedRepair.id,
        title: fetchedRepair.title,
        description: fetchedRepair.description
       })

    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleChange(event) {
    let value = event.target.value
    let name = event.target.name
    this.setState({ [name]: value })
  }

  handleSubmit(event) {
    event.preventDefault();
    if(
      validate(this.state.title, 'title', this) &&
      validate(this.state.description, 'description', this)
    ) {

    let formPayload = {
      title: this.state.title,
      description: this.state.description
    }
    fetch(`/api/v1/repairs/${this.state.id}`, {
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
      browserHistory.push(`/cars/${body.id}`)
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
          <div className="field">
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
        <a onClick={browserHistory.goBack}>Back</a>
      </div>
    )
  }
};

export default RepairsEditFormContainer;
