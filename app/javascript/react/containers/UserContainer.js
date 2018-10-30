import React, { Component } from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
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
      </div>
    )
  }
}

export default UserContainer;
