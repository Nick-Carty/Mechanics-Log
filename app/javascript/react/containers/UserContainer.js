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
      <div className="border profile-page">
        <UserShowPage/>
        <Link to={`/users/${window.currentUser.id}/cars/new`}>
          <button className="right button1">Add a Car</button>
        </Link>
        <CarsIndexContainer/>
      </div>
    )
  }
}

export default UserContainer;
