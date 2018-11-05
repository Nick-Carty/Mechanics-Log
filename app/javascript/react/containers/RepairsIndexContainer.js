import React, { Component } from 'react'
import RepairTile from '../components/RepairTile'


class RepairsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repairs: []
    }
  }

  componentDidMount() {
    fetch(`/api/v1/cars/${this.props.carId}/repairs`)
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
      let fetchedRepairs = body
      this.setState({ repairs: fetchedRepairs })

    })
    .catch(error => console.error(`Error in here: ${error.message}`));
  }

  render(){
    let repairState = this.state.repairs
    let repairs = repairState.map(repair => {
      return(
        <RepairTile
          key={repair.id}
          id={repair.id}
          title={repair.title}
          description={repair.description}
        />
      )
    })

    if(repairs.length) {
      return(
        <div className="text-center border car-index font">
          <h3>Current Repairs:</h3>
          {repairs}
        </div>
      )
    } else {
      return(
        <div className="text-center border car-index font">
          <h3>No Repair Logs</h3>
        </div>
      )
    }
  }
}

export default RepairsIndexContainer;
