import React from 'react'
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

const UserShowPage = props => {
  return(
    <div>
      <h3>Welcome, {window.currentUser.first_name}</h3>
    </div>
  )

}

export default UserShowPage;