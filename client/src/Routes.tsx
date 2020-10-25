// basic routes defined here
import React, { useEffect } from 'react';
import { Switch, useLocation } from 'react-router-dom';
import { Route } from 'react-router';
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import Home from './pages/Home';
import PrivateRoute from './containers/PrivateRoute'

function usePageViews() {
  const location = useLocation();

  useEffect(() => {}, [location]);
}

function Routes() {
  usePageViews();
  return (
    <Switch>
      <Route exact path='/login' component={LoginPage} />
      <Route exact path='/logout' component={LogoutPage} />
      <PrivateRoute path='/' component={Home} />
    </Switch>
  );
}

export default Routes;
