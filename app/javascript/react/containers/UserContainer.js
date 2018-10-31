import React, { Component } from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import { Link } from 'react-router';
import UserShowPage from '../components/UserShowPage'
import CarsIndexContainer from './CarsIndexContainer'

class UserContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <div>
        <UserShowPage/>
        <CarsIndexContainer/>
        <Link to={`/current_user/${window.currentUser.id}/cars/new`}>
          <button>Add a Car</button>
        </Link>
      </div>
    )
  }
}

export default UserContainer;
