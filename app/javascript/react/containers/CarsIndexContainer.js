import React, { Component } from 'react'
import CarTile from '../components/CarTile'

class CarsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      error: ""
    }
    this.onDelete = this.onDelete.bind(this);
  }

  deleteCar(id) {
    return fetch(`/api/v1/cars/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      credentials: 'same-origin'
    });
  }

  onDelete(event) {
    event.preventDefault();

    let confirmation = confirm("Are you sure you want to delete this car?")
    if (!confirmation) {
      return;
    }

    this.deleteCar(event.target.id)
    .then(response => response.json())
    .then(body => {
      if (body.error) {
        throw body.error
      }
      this.setState({
        cars: this.state.cars.filter(car => car.id !== body.car_id)
      });
    })
    .catch(error => {
      this.setState({ error })
      this.logError(error);
    })
  }

  parseResponse(response) {
    if (!response.ok) {
      throw new Error(`${response.status} (${response.statusText})`);
    }
    return response;
  }

  logError(error) {
    console.error(`Error in fetch: ${error.message}`);
  }

  componentDidMount() {
    fetch(`/api/v1/users/${window.currentUser.id}/cars`)
    .then(this.parseResponse)
    .then(response => response.json())
    .then(fetchedCars => this.setState({ cars: fetchedCars }))
    .catch(this.logError);
  }

  render(){
    return(
      <div className="text-center border car-index">
        <h3>Your Cars</h3>
        {
          this.state.cars.map(car => (
            <CarTile { ...car } deleteCar={this.onDelete} key={car.id} />
          ))
        }
      </div>
    )
  }
}

export default CarsIndexContainer;
