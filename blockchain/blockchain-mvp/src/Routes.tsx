import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

// view
import Nav from './common/nav/Nav';
import HomeVC from './home/vc/HomeVC';
import UserHomeVC from './user/vc/UserHomeVC';

class Routes extends Component<{}, {}> {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={HomeVC} />
        <Route path='/user' component={UserHomeVC} />
      </Switch>
    );
  }
}

export default Routes;
