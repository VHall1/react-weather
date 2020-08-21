import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import Home from './pages/Home';
import Forecast from './pages/Forecast';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/forecast" component={Forecast} />
      </Switch>
    </Router>
  );
}

export default Routes;