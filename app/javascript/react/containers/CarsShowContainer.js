import React, { Component } from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import { Link } from 'react-router';
import RepairsIndexContainer from './RepairsIndexContainer'

class CarsShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      car: {}
    }
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
      this.setState({ car: fetchedCar })

    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    let year = this.state.car.year
    let make = this.state.car.make
    let model = this.state.car.model
    let userId = this.state.car.user_id
    if(userId === window.currentUser.id){
      return(
        <div className="border profile-page text-center">
          <div className="font">
            <h1>{year} {make} {model}</h1>
          </div>
          <Link to={`/cars/${this.state.car.id}/repairs/new`}>
            <button className="right button1">Add a Repair</button>
          </Link>
          <RepairsIndexContainer
            carId={this.state.car.id}
          />
          <Link to={`/`}>
            <button className="button2">Back</button>
          </Link>
        </div>
      )
    } else {
      return(
        <div className="border profile-page text-center font">
          <h1>This is not the car you are looking for...</h1>

          <Link to={`/`}>
            <button className="button2">Back</button>
          </Link>

        </div>
      )
    }
  }
}

export default CarsShowContainer;
