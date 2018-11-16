import React, { Component } from 'react'
import RepairTile from '../components/RepairTile'


class RepairsIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repairs: [],
      error: ""
    }
    this.onDelete = this.onDelete.bind(this)
  }

  logError(error) {
    console.error(`Error in fetch: ${error.message}`);
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

  deleteRepair(id) {
    return fetch(`/api/v1/repairs/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      credentials: 'same-origin'
    });
  }

  onDelete(event) {
    event.preventDefault();

    let confirmation = confirm("Are you sure you want to delete this repair?")
    if (!confirmation) {
      return;
    }

    this.deleteRepair(event.target.id)
    .then(response => response.json())
    .then(body => {
      if(body.error) {
        throw body.error
      }
      this.setState({
        repairs: this.state.repairs.filter(repair => repair.id !== body.repair_id)
      })
    })
    .catch(error => {
      this.setState({ error})
      this.logError(error);
    })
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
          deleteRepair={this.onDelete}
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
