import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router'
import UserContainer from '../containers/UserContainer'
import CarsIndexContainer from '../containers/CarsIndexContainer'
import CarsFormContainer from '../containers/CarsFormContainer'
import CarsEditFormContainer from '../containers/CarsEditFormContainer'
import CarsShowContainer from '../containers/CarsShowContainer'
import RepairsFormContainer from '../containers/RepairsFormContainer'
import RepairsEditFormContainer from '../containers/RepairsEditFormContainer'

export const App = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={UserContainer} />
      <Route path='/users/:id' component={UserContainer} />
      <Route path='/users/:id/cars/new' component={CarsFormContainer} />
      <Route path='/cars/:car_id' component={CarsShowContainer} />
      <Route path='/cars/:car_id/edit' component={CarsEditFormContainer} />
      <Route path='/cars/:car_id/repairs/new' component={RepairsFormContainer} />
      <Route path='/repairs/:repair_id/edit' component={RepairsEditFormContainer} />
    </Router>
  );
}

export default App
