import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router'
import UserContainer from '../containers/UserContainer'
import CarsIndexContainer from '../containers/CarsIndexContainer'
import CarsFormContainer from '../containers/CarsFormContainer'

export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={UserContainer} />
      <Route path='/users/:id' component={UserContainer} />
      <Route path='/users/:id/cars/new' component={CarsFormContainer} />
    </Router>
  );
}

export default App
