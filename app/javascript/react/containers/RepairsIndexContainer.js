import React, { Component } from 'react'
import RepairTile from '../components/RepairTile'


class RepairsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repairs: [],
      error: ""
    }
    this.deleteRepair = this.deleteRepair.bind(this)
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
      let fetchedRepairs = body.repairs
      this.setState({ repairs: fetchedRepairs })

    })
    .catch(error => console.error(`Error in here: ${error.message}`));
  }

  deleteRepair(event) {
    event.preventDefault();
    let confirmation = confirm("Are you sure you want to delete this repair?")
    if (confirmation) {
      fetch(`/api/v1/repairs/${event.target.id}.json`, {
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
          let newRepairs = this.state.repairs.filter(repair => {
            return(
              repair.id !== body.repair_id
            )
          })
          this.setState({repairs: newRepairs})
        }
      })
      .catch(error => {
        this.setState({error: error})
        console.log(error);
        console.log("ERROR in FETCH")
      })
    }
  }

  render(){
    let repairState = this.state.repairs
    let repairs = repairState.map(repair => {
      return(
        <RepairTile
          key={repair.id}
          id={repair.id}
          title={repair.title}
          createdDate={repair.createdDate}
          updatedDate={repair.updatedDate}
          description={repair.description}
          deleteRepair={this.deleteRepair}
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
