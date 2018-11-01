import React, { Component } from 'react'
import CarTile from '../components/CarTile'


class CarsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: []
    }
  }

  componentDidMount() {
    fetch(`/api/v1/users/${window.currentUser.id}/cars`)
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
      let fetchedCars = body
      this.setState({ cars: fetchedCars })

    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){

    let cars = this.state.cars.map(car => {
      return(

        <CarTile
          key={car.id}
          id={car.id}
          year={car.year}
          make={car.make}
          model={car.model}
        />
      )
    })
    return(
      <div className="text-center border car-index">
        <h3>Your Cars</h3>
        {cars}
      </div>

    )
  }
}

export default CarsIndexContainer;
