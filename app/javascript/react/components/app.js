import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router'
import UserContainer from '../containers/UserContainer'
import CarsIndexContainer from '../containers/CarsIndexContainer'

export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/users/:id' component={UserContainer} />
    </Router>
  );
}

export default App
