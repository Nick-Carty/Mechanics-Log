import React, { Component } from 'react'
import CarTile from '../components/CarTile'


class CarsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      error: ""
    }
    this.deleteCar = this.deleteCar.bind(this)
  }

  deleteCar(event) {
    event.preventDefault();
    let confirmation = confirm("Are you sure you want to delete this car?")
    if (confirmation) {
      fetch(`/api/v1/cars/${event.target.id}.json`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' },
        credentials: 'same-origin'
      })
      .then(response => response.json())
      .then(body => {
        if(body.error) {
          throw body.error
        } else {
          let newCars = this.state.cars.filter(car => {
            return(
              car.id !== body.car_id
            )
          })
          this.setState({cars: newCars})
        }
      })
      .catch(error => {
        this.setState({error: error})
        console.log(error);
        console.log("ERROR in FETCH")
      })
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
    console.log(this.state.cars);
    let cars = this.state.cars.map(car => {
      return(

        <CarTile
          key={car.id}
          id={car.id}
          year={car.year}
          make={car.make}
          model={car.model}
          deleteCar={this.deleteCar}
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
